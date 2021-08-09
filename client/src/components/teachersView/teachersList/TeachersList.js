import React from 'react';
import PropTypes from "prop-types";
import TeacherItem from "./teacherItem/TeacherItem";

const TeachersList = ({teachers, deleteTeacher, openTeacher}) => {

  return (
    <div>
      {
        teachers.map(teacher => <TeacherItem key={teacher._id} teacher={teacher}
                                             deleteTeacher={() => deleteTeacher(teacher._id)}
                                             openTeacher={() => openTeacher(teacher)}/>)
      }
    </div>
  )
}

TeachersList.propTypes = {
  teachers: PropTypes.object.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  openTeacher: PropTypes.func.isRequired,
};

export default TeachersList;