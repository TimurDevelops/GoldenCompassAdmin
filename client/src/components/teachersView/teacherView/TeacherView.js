import React, {useState} from 'react';
import PropTypes from "prop-types";

import TeachersStudentsList from "./teachersStudentsList/TeachersStudentsList";

const TeacherView = ({editTeacher, teacherToEdit: {_id: id, name: oldName, login: oldLogin, students: oldStudents}}) => {
  const [name, setName] = useState(oldName);
  const [login, setLogin] = useState(oldLogin);
  const [students, setStudents] = useState(oldStudents);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTeacher({id, name, login, students})
  }

  return (
    <div>
      <div className={'add-teacher-form add-form'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className={'inputs-wrapper'}>
            <div className="form-group field">
              <input autoComplete='off' type="input" className="form-field" placeholder="ФИО" name="name" id='name' value={name}
                     onChange={e => setName(e.target.value)} required/>
              <label htmlFor="name" className="form-label">ФИО</label>
            </div>

            <div className="form-group field">
              <input autoComplete='off' type="input" className="form-field" placeholder="Логин" name="login" id='login' value={login}
                     onChange={e => setLogin(e.target.value)} required/>
              <label htmlFor="login" className="form-label">Логин</label>
            </div>

            <TeachersStudentsList students={students} setStudents={setStudents}/>

            <div className='submit-btn-wrapper'>
              <button type="submit" className='btn' id='addStudent'>
                <span>Подтвердить</span>
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

TeacherView.propTypes = {
  editTeacher: PropTypes.func.isRequired,
  teacherToEdit: PropTypes.object.isRequired,
};

export default TeacherView;