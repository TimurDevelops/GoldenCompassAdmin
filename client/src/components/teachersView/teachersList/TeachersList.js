import React from 'react';
import PropTypes from "prop-types";
import TeacherItem from "./teacherItem/TeacherItem";

const TeachersList = ({teachers, deleteTeacher, openTeacher, resetPassword}) => {

  return (
    <div className={'teachers-list-wrapper'}>
      {
        teachers.map(teacher => <TeacherItem key={teacher._id} teacher={teacher}
                                             deleteTeacher={() => deleteTeacher(teacher._id)}
                                             openTeacher={() => openTeacher(teacher)}
                                             resetPassword={() => resetPassword(teacher._id, teacher.name)}/>)
      }
    </div>
  )
}

TeachersList.propTypes = {
  teachers: PropTypes.array.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  openTeacher: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default TeachersList;