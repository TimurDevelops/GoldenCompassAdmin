import React, {useState} from 'react';
import PropTypes from "prop-types";

import AddLesson from "./addLesson/AddLesson";
import LessonsList from "./lessonsList/LessonsList";
import Header from "../ui/Header";

import Modal from "../ui/Modal";
import LessonsView from "./lessonView/LessonView";

const LessonsView = ({logout, setAlert, lessons, createLesson, deleteLesson, editLesson}) => {
  const [, ] = useState([]);
  const [addLessonVisible, setAddLessonVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const lesson = lessons.filter(i => i._id === id)[0];

    if (!lesson) return setAlert('Ошибка при открытии урока', 'danger')

    setLessonToEdit(lesson)
  }

  const handleEditLesson = (lesson) => {
    editLesson(lesson)
    closeModal()

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
          modalOpen && <LessonsView lessonToEdit={lessonToEdit} editLesson={handleEditLesson} setAlert={setAlert}/>
        }
      />
    </div>
  )
}

LessonsView.propTypes = {
  lessons: PropTypes.array.isRequired,
  createLesson: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default LessonsView;