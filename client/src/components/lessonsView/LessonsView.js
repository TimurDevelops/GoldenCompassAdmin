import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddLesson from "./addLesson/AddLesson";
import LessonsList from "./lessonsList/LessonsList";
import LessonView from "./lessonView/LessonView";

import Modal from "../ui/Modal";

import api from "../../utils/api";

const LessonsView = ({logout, setAlert}) => {
  const [addLessonVisible, setAddLessonVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [lessons, setLessons] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const lesson = lessons.filter(i => i._id === id)[0];

    if (!lesson) return setAlert('Ошибка при открытии урока', 'danger')

    setLessonToEdit(lesson)
  }

  useEffect(() => {
    const getLessons = async () => {
      const res = await api.post('/lessons/get-lessons');
      setLessons(res.data.lessons);
    }
    getLessons().catch((err) => console.error(err))

  }, []);

  const createLesson = async ({lessonTitle}) => {
    try {
      const res = await api.post('/lessons', {name: lessonTitle});
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
      console.log(res)
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

          <button className={'btn'}
                  onClick={() => setAddLessonVisible(!addLessonVisible)}>{addLessonVisible ? 'Закрыть' : 'Добавить урок'}</button>

          {addLessonVisible && <AddLesson createLesson={createLesson}/>}

          <LessonsList lessons={lessons} deleteLesson={deleteLesson} openLesson={openModal}/>

          <Modal
            title={`Редактирование урока: \n ${lessonToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen && <LessonView lessonToEdit={lessonToEdit} editLesson={editLesson} setAlert={setAlert}/>
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