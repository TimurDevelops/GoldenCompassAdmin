import React from 'react';
import PropTypes from "prop-types";
import { FaTimes } from 'react-icons/fa';

import './LessonItem.scss';

const LessonItem = ({lesson, deleteLesson, openLesson}) => {
  return (
    <div className={'lesson-wrapper'} onDoubleClick={() => openLesson(lesson._id)}>
      <h4 className={'lesson-title'}>{lesson.name}</h4>
      <div className={'delete-btn'} onClick={()=>deleteLesson()}>
        <FaTimes/>
      </div>
    </div>
  )
}

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  openLesson: PropTypes.func.isRequired,
};

export default LessonItem;