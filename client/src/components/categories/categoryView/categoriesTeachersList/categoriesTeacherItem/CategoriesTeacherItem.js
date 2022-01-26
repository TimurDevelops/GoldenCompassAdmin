import React from "react";
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

const CategoriesTeacherItem = ({teacher, deleteTeacher}) => {
  return (
    <div className={'category-teacher-item inline-item'}>
      <div className={'label'}>{teacher.name}</div>

      <div className={'delete-btn'} onClick={deleteTeacher}>
        <FaTimes/>
      </div>

    </div>
  )
}


CategoriesTeacherItem.propTypes = {
  teacher: PropTypes.object.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
};

export default CategoriesTeacherItem;