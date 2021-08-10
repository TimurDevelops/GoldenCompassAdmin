import React from 'react';
import PropTypes from "prop-types";
import StudentItem from "./studentItem/StudentItem";

const StudentsList = ({students, deleteStudent}) => {

  return (
    <div className={'students-list-wrapper'}>
      {
        students.map(student => <StudentItem key={student._id} student={student}
                                             deleteStudent={() => deleteStudent(student._id)}/>)
      }
    </div>
  )
}

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default StudentsList;