import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import AddLesson from "./addLesson/AddLesson";
import LessonsList from "./lessonsList/LessonsList";
import Header from "../ui/Header";

import api from "../../utils/api";
import Modal from "../ui/Modal";
import LessonsView from "../lessonView/LessonView";

const MainView = ({logout, setAlert}) => {
  const [lessons, setLessons] = useState([]);
  const [addLessonVisible, setAddLessonVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState({});

  useEffect(() => {
    const getLessons = async () => {
      const res = await api.get('/lessons/get-lessons');
      setLessons(res.data.lessons);
    }
    getLessons().catch((err) => console.error(err))
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  }
  const openModal = (id) => {
    setModalOpen(false);
    const lesson = lessons.filter(i => i._id === id)[0];

    if (!lesson) return setAlert('Ошибка при открытии урока', 'danger')

    setLessonToEdit(lesson)
  }

  const createLesson = async ({lessonTitle}) => {
    const newLesson = await api.post('/lessons', {name: lessonTitle});
    setLessons([...lessons, newLesson])

  }
  const deleteLesson = async (id) => {
    await api.delete('/lessons', {id});
    setLessons(lessons.filter(lesson => lesson._id !== id))
  }

  const editLesson = async (newLesson) => {
    const createdLesson = await api.put('/lessons', {lesson: newLesson});


    setLessons(lessons.map((lesson) => {
      if (lesson._id === newLesson._id) return createdLesson;
      else return lesson;
    }))
  }

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>
      <button style={{'margin': '20px'}}
              onClick={() => setAddLessonVisible(!addLessonVisible)}>{addLessonVisible ? 'Закрыть' : 'Добавить урок'}</button>
      {addLessonVisible && <AddLesson createLesson={createLesson}/>}
      <LessonsList lessons={lessons} deleteLesson={deleteLesson} openLesson={openModal}/>

      <Modal
        title={`Редактирование урока: \n ${lessonToEdit.name}`}
        open={modalOpen}
        closeModal={closeModal}
        content={
          modalOpen && <LessonsView lessonToEdit={lessonToEdit} editLesson={editLesson} setAlert={setAlert}/>
        }
       />
    </div>
  )
}

MainView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default MainView;