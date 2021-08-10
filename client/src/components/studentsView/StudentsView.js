import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddStudent from "./addStudent/AddStudent";
import StudentsList from "./studentsList/StudentsList";

import api from "../../utils/api";

const StudentsView = ({logout, setAlert}) => {
  const [addStudentVisible, setAddStudentVisible] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const res = await api.post('/students/get-students');
      setStudents(res.data.students);
    }
    getStudents().catch((err) => console.error(err))

  }, []);

  const createStudent = async (student) => {
    try {
      const res = await api.post('/students', {...student});
      const newStudent = res.data.user;
      setStudents([...students, newStudent])
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const deleteStudent = async (studentId) => {
    try {
      await api.delete('/students', {
        headers: {},
        data: {
          studentId
        },
      });
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    setStudents(students.filter(i => i._id !== studentId))
  }

  const resetPassword = async (studentId, studentName) => {
    try {
      const res = await api.post('/students/reset-password', {id: studentId});
      alert(`Новый пароль для пользователя ${studentName}: ${res.data.p}`)
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }
  return (
    <div>
      <Header logout={logout}/>
      <div className={'view-content'}>
        <div className={'view-content-inner'}>

          <button className={'btn'}
                  onClick={() => setAddStudentVisible(!addStudentVisible)}>{addStudentVisible ? 'Закрыть' : 'Добавить ученика'}</button>
          {addStudentVisible && <AddStudent createLesson={createStudent} addStudent={createStudent}/>}

          <StudentsList students={students} deleteStudent={deleteStudent} resetPassword={resetPassword}/>
        </div>
      </div>

    </div>
  )
}

StudentsView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default StudentsView;