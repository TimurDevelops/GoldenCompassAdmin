import React from 'react';
import PropTypes from "prop-types";
import {FaTimes, FaEdit, FaSyncAlt} from 'react-icons/fa';

const TeacherItem = ({teacher, deleteTeacher, openTeacher, resetPassword}) => {

  return (
    <div className={'teacher-wrapper item-wrapper'}>
      <h4 className={'teacher-title'}>
        ФИО: {teacher.name}<br/>
        Логин: {teacher.login}
      </h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteTeacher()}>
          <FaTimes/>
        </div>
        <div className={'edit-btn'} onClick={() => openTeacher()}>
          <FaEdit/>
        </div>
        <div className={'reset-btn'} onClick={() => resetPassword()} title="Сменить пароль">
          <FaSyncAlt/>
        </div>
      </div>
    </div>
  )
}

TeacherItem.propTypes = {
  teacher: PropTypes.object.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  openTeacher: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default TeacherItem;