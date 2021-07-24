import React, {useState} from 'react';
import PropTypes from "prop-types";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';


const LessonsView = ({lessonToEdit: {slides, lessonTitle}, setAlert}) => {
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);

  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      {
        LessonTitle: newLessonTitle,
        Slides: newSlides
      }
    )
  }


  const createSlide = async () => {

  }

  const deleteSlide = async () => {

  }

  const editSlide = async () => {

  }

  return (

    <div>
      <section className={'form-wrapper'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>

          <div className={'inputs-wrapper'}>
            <LessonTitleEditor
              lessonTitle={lessonTitle}
              newLessonTitle={newLessonTitle}
              setNewLessonTitle={setNewLessonTitle}
            />

            <SlidesEditor
              slides={newSlides}
              createSlide={createSlide}
              deleteSlide={deleteSlide}
              editSlide={editSlide}
              setAlert={setAlert}
            />

          </div>
        </form>

      </section>


    </div>

  )
}

LessonsView.propTypes = {
  lessonToEdit: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default LessonsView;