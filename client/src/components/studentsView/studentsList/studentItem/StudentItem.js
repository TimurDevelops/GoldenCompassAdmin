import React from 'react';
import PropTypes from "prop-types";
import {FaSyncAlt, FaTimes} from 'react-icons/fa';

const StudentItem = ({student, deleteStudent, resetPassword}) => {
  return (
    <div className={'student-wrapper item-wrapper'}>
      <h4 className={'teacher-title'}>
        ФИО: {student.name}<br/>
        Логин: {student.login}
      </h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteStudent()}>
          <FaTimes/>
        </div>
        <div className={'reset-btn'} onClick={() => resetPassword()} title="Сменить пароль">
          <FaSyncAlt/>
        </div>
      </div>
    </div>
  )
}

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default StudentItem;