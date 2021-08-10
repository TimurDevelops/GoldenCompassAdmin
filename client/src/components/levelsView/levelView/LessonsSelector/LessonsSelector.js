import React from "react";
import PropTypes from "prop-types";
import Selector from "../../../ui/Selector";

const LessonsSelector = ({lessons, setSelectedLesson}) => {

  const formattedLevels = lessons.map(lesson => {

    return Object.assign(lesson, {
      html: (
        <div className={'lesson-item'}>
          {lesson.name}
        </div>
      )
    })
  })

  const onChange = (id) => {
    setSelectedLesson(lessons.find(i => i._id === id))
  }

  return (
    <div>
      <Selector items={formattedLevels} onChange={onChange} label={'Выберите уроки...'}
                valueField={'_id'}/>
    </div>
  )
}


LessonsSelector.propTypes = {
  lessons: PropTypes.array.isRequired,
  setSelectedLesson: PropTypes.func.isRequired,
};

export default LessonsSelector;