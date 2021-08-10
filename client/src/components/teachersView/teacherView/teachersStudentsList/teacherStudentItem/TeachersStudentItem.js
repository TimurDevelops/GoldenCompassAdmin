import React from "react";
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

const TeachersStudentItem = ({student, deleteStudent}) => {
  return (
    <div className={'teacher-student-item inline-item'}>
      <div className={'label'}>{student.name} ({student.login})</div>

      <div className={'delete-btn'} onClick={deleteStudent}>
        <FaTimes/>
      </div>

    </div>
  )
}


TeachersStudentItem.propTypes = {
  student: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default TeachersStudentItem;