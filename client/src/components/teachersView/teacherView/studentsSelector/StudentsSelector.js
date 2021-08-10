import React from "react";
import PropTypes from "prop-types";
import Selector from "../../../ui/Selector";

const StudentsSelector = ({students, setSelectedStudent}) => {

  const formattedStudents = students.map(student => {

    return Object.assign(student, {
      html: (
        <div className={'student-item'}>
          ФИО: {student.name}<br/>
          Логин: {student.login}
        </div>
      )
    })
  })

  const onChange = (id) => {
    setSelectedStudent(students.find(i => i._id === id))
  }

  return (
    <div>
      <Selector items={formattedStudents} onChange={onChange} label={'Выберите студента...'}
                valueField={'_id'}/>
    </div>
  )
}


StudentsSelector.propTypes = {
  students: PropTypes.array.isRequired,
  setSelectedStudent: PropTypes.func.isRequired,
};

export default StudentsSelector;