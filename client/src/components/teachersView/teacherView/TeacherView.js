import React, {useState} from 'react';
import PropTypes from "prop-types";

import TeachersStudentsList from "./teachersStudentsList/TeachersStudentsList";
import TeachersLevelsList from "./teachersLevelsList/TeachersLevelsList";

const TeacherView = ({
                       editTeacher,
                       teacherToEdit: {
                         _id: id,
                         name: oldName,
                         login: oldLogin,
                         students: oldStudents,
                         levels: oldLevels,
                         isAdmin: oldIsAdmin
                       }
                     }) => {
  const [name, setName] = useState(oldName);
  const [login, setLogin] = useState(oldLogin);
  const [isAdmin, setIsAdmin] = useState(oldIsAdmin || false);
  const [students, setStudents] = useState(oldStudents);
  const [levels, setLevels] = useState(oldLevels);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTeacher({id, name, login, students, levels, isAdmin})
  }

  return (
    <div className={'edit-teacher-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="ФИО" name="name" id='name'
                   value={name}
                   onChange={e => setName(e.target.value)} required/>
            <label htmlFor="name" className="form-label">ФИО</label>
          </div>

          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Логин" name="login" id='login'
                   value={login}
                   onChange={e => setLogin(e.target.value)} required/>
            <label htmlFor="login" className="form-label">Логин</label>
          </div>

          <div className="form-group field flex">
            <label htmlFor="admin" className="form-label">Админ: </label>
            <input type="checkbox" className="form-field" placeholder="Админ" name="admin" id='admin'
                   checked={isAdmin}
                   onChange={e => setIsAdmin(e.target.checked)}/>
          </div>

          <TeachersStudentsList students={students} setStudents={setStudents}/>

          <TeachersLevelsList levels={levels} setLevels={setLevels}/>
        </div>

        <div className='submit-btn-wrapper'>
          <button type="submit" className='btn'>
            <span>Закончить редактирование</span>
          </button>
        </div>
      </form>
    </div>
  )
}

TeacherView.propTypes = {
  editTeacher: PropTypes.func.isRequired,
  teacherToEdit: PropTypes.object.isRequired,
};

export default TeacherView;