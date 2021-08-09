import React, {useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";
import AddTeacher from "../teachersView/addTeacher/AddTeacher";
import TeachersList from "./teachersList/TeachersList";
import TeacherView from "../teachersView/teacherView/TeacherView";

import Modal from "../ui/Modal";


const TeachersView = ({logout, teachers, students, createTeacher, deleteTeacher, editTeacher, setAlert}) => {
  const [addTeacherVisible, setAddTeacherVisible] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false)
  }

  const openTeacher = (teacher) => {
    setTeacherToEdit(teacher)
    setModalOpen(true)
  }

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>
      <TeachersList teachers={teachers} deleteTeacher={deleteTeacher} openTeacher={openTeacher}/>

      <button style={{'margin': '20px'}}
              onClick={() => setAddTeacherVisible(!addTeacherVisible)}>{addTeacherVisible ? 'Закрыть' : 'Добавить урок'}</button>
      {addTeacherVisible && <AddTeacher addTeacher={createTeacher}/>}


      <Modal
        title={`Редактирование урока: \n ${teacherToEdit.name}`}
        open={modalOpen}
        closeModal={closeModal}
        content={
          modalOpen && <TeacherView teacherToEdit={teacherToEdit} editTeacher={editTeacher} setAlert={setAlert} students={students}/>
        }
      />

    </div>
  )
}

TeachersView.propTypes = {
  createTeacher: PropTypes.func.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  editTeacher: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  teachers: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
};

export default TeachersView;