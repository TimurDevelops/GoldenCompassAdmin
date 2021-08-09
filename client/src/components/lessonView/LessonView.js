import React, {useState} from 'react';
import PropTypes from "prop-types";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';


const LessonsView = ({lessonToEdit: {_id: id, slides, name: lessonTitle}, setAlert, editLesson}) => {
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);

  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = () => {
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

    <div>
      <section className={'form-wrapper'}>

        <div className={'inputs-wrapper'}>
          <LessonTitleEditor
            lessonTitle={lessonTitle}
            newLessonTitle={newLessonTitle}
            setNewLessonTitle={setNewLessonTitle}
          />

          <SlidesEditor slides={newSlides} setSlides={setNewSlides} setAlert={setAlert}/>

        </div>
        <div>
          <button className={'btn'} onClick={() => handleSubmit()}>Закончить редактирование</button>
        </div>
      </section>

    </div>

  )
}

LessonsView.propTypes = {
  lessonToEdit: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
};

export default LessonsView;