import React from 'react';
import PropTypes from "prop-types";
import {FaTimes, FaEdit} from 'react-icons/fa';

const TeacherItem = ({teacher, deleteTeacher, openTeacher}) => {

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
      </div>
    </div>
  )
}

TeacherItem.propTypes = {
  teacher: PropTypes.object.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  openTeacher: PropTypes.func.isRequired,
};

export default TeacherItem;