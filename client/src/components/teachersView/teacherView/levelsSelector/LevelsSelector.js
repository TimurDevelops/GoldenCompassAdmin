import React from "react";
import PropTypes from "prop-types";
import Selector from "../../../ui/Selector";

const LevelsSelector = ({levels, setSelectedLevel}) => {

  const formattedStudents = levels.map(student => {

    return Object.assign(student, {
      html: (
        <div className={'level-item'}>
          {student.name}
        </div>
      )
    })
  })

  const onChange = (id) => {
    setSelectedLevel(levels.find(i => i._id === id))
  }

  return (
    <div>
      <Selector items={formattedStudents} onChange={onChange} label={'Выберите доступные уровни...'}
                valueField={'_id'}/>
    </div>
  )
}


LevelsSelector.propTypes = {
  levels: PropTypes.array.isRequired,
  setSelectedLevel: PropTypes.func.isRequired,
};

export default LevelsSelector;