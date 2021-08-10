import React from "react";
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

const LevelsLessonItem = ({lesson, deleteLesson}) => {
  return (
    <div className={'level-lesson-item inline-item'}>
      <div className={'label'}>{lesson.name}</div>

      <div className={'delete-btn'} onClick={deleteLesson}>
        <FaTimes/>
      </div>

    </div>
  )
}


LevelsLessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

export default LevelsLessonItem;