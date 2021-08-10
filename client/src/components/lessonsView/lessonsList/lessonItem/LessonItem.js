import React from 'react';
import PropTypes from "prop-types";
import {FaTimes, FaEdit} from 'react-icons/fa';

const LessonItem = ({lesson, deleteLesson, openLesson}) => {
  return (
    <div className={'lesson-wrapper item-wrapper'}>
      <h4 className={'lesson-title'}>{lesson.name}</h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteLesson()}>
          <FaTimes/>
        </div>
        <div className={'edit-btn'} onClick={() => openLesson()}>
          <FaEdit/>
        </div>
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