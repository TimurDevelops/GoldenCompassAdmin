import React from 'react';
import PropTypes from "prop-types";

const TeacherView = ({editTeacher, teacherToEdit, students}) => {

  return (
    <div>

    </div>
  )
}

TeacherView.propTypes = {
  editTeacher: PropTypes.func.isRequired,
  teacherToEdit: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
};

export default TeacherView;