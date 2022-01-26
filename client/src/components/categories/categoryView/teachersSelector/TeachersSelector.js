import React from "react";
import PropTypes from "prop-types";
import Selector from "../../../ui/Selector";

const TeachersSelector = ({teachers, setSelectedTeacher}) => {

  const formattedTeachers = teachers.map(teacher => {

    return Object.assign(teacher, {
      html: (
        <div className={'teacher-item'}>
          {teacher.name}
        </div>
      )
    })
  })

  const onChange = (id) => {
    setSelectedTeacher(formattedTeachers.find(i => i._id === id))
  }

  return (
    <div>
      <Selector items={formattedTeachers} onChange={onChange} label={'Выберите учителей...'}
                valueField={'_id'}/>
    </div>
  )
}


TeachersSelector.propTypes = {
  teachers: PropTypes.array.isRequired,
  setSelectedTeacher: PropTypes.func.isRequired,
};

export default TeachersSelector;