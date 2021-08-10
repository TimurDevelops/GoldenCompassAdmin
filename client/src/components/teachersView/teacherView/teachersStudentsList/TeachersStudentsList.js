import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import api from "../../../../utils/api";
import TeachersStudentItem from "./teacherStudentItem/TeachersStudentItem";
import StudentsSelector from "../studentsSelector/StudentsSelector";


const TeachersStudentsList = ({students, setStudents}) => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const res = await api.post('/students/get-students');
      const studentsIds = students.map(student => student._id)
      const newStudents = res.data.students.filter(student => !studentsIds.includes(student._id))
      setAllStudents(newStudents);
    }
    getStudents().catch((err) => console.error(err))

  }, [students]);

  const setSelectedStudent = (student) => {
    setStudents([...students, student])
  }

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student._id !== id));
  }


  return (
    <div className={'teachers-students-wrapper inline-list'}>
      <div className={'list-wrapper'}>
        <div className={'group-title'}>Студенты:</div>
        {
          students.map(student => <TeachersStudentItem key={student._id} student={student}
                                                       deleteStudent={() => deleteStudent(student._id)}/>)
        }
      </div>
      <StudentsSelector students={allStudents} setSelectedStudent={setSelectedStudent}/>
    </div>
  )
}

TeachersStudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default TeachersStudentsList;