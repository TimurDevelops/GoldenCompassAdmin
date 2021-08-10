import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddTeacher from "../teachersView/addTeacher/AddTeacher";
import TeachersList from "./teachersList/TeachersList";
import TeacherView from "../teachersView/teacherView/TeacherView";

import Modal from "../ui/Modal";
import api from "../../utils/api";


const TeachersView = ({logout, setAlert}) => {
  const [addTeacherVisible, setAddTeacherVisible] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const closeModal = () => {
    setModalOpen(false)
  }

  const openTeacher = (teacher) => {
    setTeacherToEdit(teacher)
    setModalOpen(true)
  }


  useEffect(() => {
    const getTeachers = async () => {
      const res = await api.post('/teachers/get-teachers');
      setTeachers(res.data.teachers);
    }
    getTeachers().catch((err) => console.error(err))

  }, []);


  const createTeacher = async (teacher) => {
    try {
      const res = await api.post('/teachers', {...teacher});
      const newTeacher = res.data.user;
      setTeachers([...teachers, newTeacher])
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const deleteTeacher = async (teacherId) => {
    try {
      await api.delete('/teachers', {
        headers: {},
        data: {
          teacherId
        },
      });
      setTeachers(teachers.filter(i => i._id !== teacherId))
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const editTeacher = async ({id, name, login, students}) => {
    const newStudents = students.map(student => student._id)

    let createdTeacher;
    try {
      let res = await api.put('/teachers', {id, name, login, students: newStudents});
      createdTeacher = res.data.teacher;
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    closeModal()

    setTeachers(teachers.map((teacher) => {
      if (teacher._id === id) return createdTeacher;
      else return teacher;
    }))
  }


  return (
    <div>
      <Header logout={logout}/>

      <div className={'view-content'}>
        <div className={'view-content-inner'}>

          <button className={'btn'}
                  onClick={() => setAddTeacherVisible(!addTeacherVisible)}>{addTeacherVisible ? 'Закрыть' : 'Добавить учителя'}</button>
          {addTeacherVisible && <AddTeacher addTeacher={createTeacher}/>}

          <TeachersList teachers={teachers} deleteTeacher={deleteTeacher} openTeacher={openTeacher}/>

          <Modal
            title={`Редактирование учителя: \n ${teacherToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen && <TeacherView teacherToEdit={teacherToEdit} editTeacher={editTeacher} setAlert={setAlert}/>
            }
          />

        </div>
      </div>
    </div>
  )
}

TeachersView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default TeachersView;