import React, {useState} from 'react';
import PropTypes from "prop-types";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';


const LessonView = ({lessonToEdit: {_id: id, slides, name: lessonTitle}, setAlert, editLesson}) => {
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);

  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = (e) => {
    e.preventDefault();
    editLesson(
      {
        id,
        title: newLessonTitle,
        slides: newSlides,
      }
    )
    setNewSlides([])
  }

  return (
    <div className={'edit-lesson-form add-form'}>

      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <LessonTitleEditor
            newLessonTitle={newLessonTitle}
            setNewLessonTitle={setNewLessonTitle}
          />

          <SlidesEditor slides={newSlides} setSlides={setNewSlides} setAlert={setAlert}/>

        </div>

        <div className='submit-btn-wrapper'>
          <button type="submit" className='btn'>
            <span>Закончить редактирование</span>
          </button>
        </div>
      </form>
    </div>
  )
}

LessonView.propTypes = {
  lessonToEdit: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
};

export default LessonView;