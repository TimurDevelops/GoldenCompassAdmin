import React, {useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import StudentsList from "./studentsList/StudentsList";
import AddStudent from "./addStudent/AddStudent";

const StudentsView = ({logout, students, createStudent, deleteStudent}) => {
  const [addStudentVisible, setAddStudentVisible] = useState(false);

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>
      <StudentsList students={students} deleteStudent={deleteStudent}/>

      <button style={{'margin': '20px'}}
              onClick={() => setAddStudentVisible(!addStudentVisible)}>{addStudentVisible ? 'Закрыть' : 'Добавить урок'}</button>
      {addStudentVisible && <AddStudent createLesson={createStudent} addStudent={createStudent}/>}

    </div>
  )
}

StudentsView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  createStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
};

export default StudentsView;