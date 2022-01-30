import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddLesson from "./addLesson/AddLesson";
import LessonsList from "./lessonsList/LessonsList";
import LessonView from "./lessonView/LessonView";

import Modal from "../ui/Modal";

import api from "../../utils/api";
import Selector from "../ui/Selector";

const LessonsView = ({logout, setAlert}) => {
  const [addLessonVisible, setAddLessonVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [lessons, setLessons] = useState([]);
  const [visibleLessons, setVisibleLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const lesson = lessons.filter(i => i._id === id)[0];

    if (!lesson) return setAlert('Ошибка при открытии урока', 'danger')

    setLessonToEdit(lesson)
  }

  const onCategoryChange = (categoryId) => {
    setCategory(categories.find(i => i._id === categoryId))
  }

  useEffect(() => {
    setVisibleLessons(lessons.filter(i => i.category === category._id))
  }, [lessons, category]);

  useEffect(() => {
    const getLessons = async () => {
      const res = await api.post('/lessons/get-lessons');
      setLessons(res.data.lessons);
    }
    getLessons().catch((err) => console.error(err))

  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.post('/categories/get-categories');
      setCategories(res.data.categories);
    }
    getCategories().catch((err) => console.error(err))

  }, []);

  const createLesson = async ({lessonTitle, category}) => {
    try {
      const res = await api.post('/lessons', {name: lessonTitle, category});
      const newLesson = res.data.lesson;
      setLessons([...lessons, newLesson]);
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const deleteLesson = async (lessonId) => {
    try {
      await api.delete('/lessons', {
        headers: {},
        data: {
          lessonId
        },
      });
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    setLessons(lessons.filter(lesson => lesson._id !== lessonId))
  }

  const editLesson = async (newLesson) => {
    let createdLesson;
    try {
      const res = await api.put('/lessons', newLesson);
      createdLesson = res.data.lesson;

    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    closeModal()
    setLessons(lessons.map((lesson) => {
      if (lesson._id === newLesson.id) return createdLesson;
      else return lesson;
    }))
  }


  return (
    <div>
      <Header logout={logout}/>

      <div className={'view-content'}>
        <div className={'view-content-inner'}>

          <Selector items={categories}
                    onChange={onCategoryChange}
                    label={category ? category["name"] : null}
                    valueField={'_id'}/>

          <button className={'btn'}
                  onClick={() => setAddLessonVisible(!addLessonVisible)}>{addLessonVisible ? 'Закрыть' : 'Добавить урок'}</button>

          {addLessonVisible && <AddLesson createLesson={createLesson} category={category}/>}

          <LessonsList lessons={visibleLessons} deleteLesson={deleteLesson} openLesson={openModal}/>

          <Modal
            title={`Редактирование урока: \n ${lessonToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen && <LessonView lessonToEdit={lessonToEdit} categories={categories} editLesson={editLesson} setAlert={setAlert}/>
            }
          />

        </div>
      </div>
    </div>
  )
}

LessonsView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default LessonsView;