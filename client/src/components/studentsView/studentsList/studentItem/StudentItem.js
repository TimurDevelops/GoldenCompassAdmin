import React from 'react';
import PropTypes from "prop-types";
import {FaTimes} from 'react-icons/fa';

import './StudentItem.scss';

const StudentItem = ({student, deleteStudent}) => {
  return (
    <div className={'student-wrapper'}>
      <h4 className={'student-title'}>{student.name}</h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteStudent()}>
          <FaTimes/>
        </div>
      </div>
    </div>
  )
}

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default StudentItem;