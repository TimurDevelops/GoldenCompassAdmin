import React from 'react';
import PropTypes from "prop-types";
import LessonItem from "./lessonItem/LessonItem";

import './LessonsList.scss';

const LessonsList = ({lessons, deleteLesson, openLesson}) => {
  return (
    <div className={'lessons-list-wrapper'}>
      <h3 className={'list-header'}>Список уроков</h3>
      <div className={'lessons-list-wrapper'}>
        {lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}
                                           deleteLesson={() => deleteLesson(lesson._id)}
                                           openLesson={openLesson}/>)}
      </div>
    </div>
  )
}

LessonsList.propTypes = {
  lessons: PropTypes.array.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  openLesson: PropTypes.func.isRequired,
};

export default LessonsList;