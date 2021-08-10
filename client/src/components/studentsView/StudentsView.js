import React, {useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import StudentsList from "./studentsList/StudentsList";
import AddStudent from "./addStudent/AddStudent";

const StudentsView = ({logout, students, createStudent, deleteStudent}) => {
  const [addStudentVisible, setAddStudentVisible] = useState(false);

  return (
    <div>
      <Header logout={logout}/>
      <div className={'view-content'}>
        <div className={'view-content-inner'}>

          <button className={'btn'}
                  onClick={() => setAddStudentVisible(!addStudentVisible)}>{addStudentVisible ? 'Закрыть' : 'Добавить ученика'}</button>
          {addStudentVisible && <AddStudent createLesson={createStudent} addStudent={createStudent}/>}

          <StudentsList students={students} deleteStudent={deleteStudent}/>
        </div>
      </div>

    </div>
  )
}

StudentsView.propTypes = {
  createStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
};

export default StudentsView;