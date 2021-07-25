import React, {useState} from 'react';
import PropTypes from "prop-types";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';


const LessonsView = ({lessonToEdit: {slides, name: lessonTitle}, setAlert}) => {
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);

  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = () => {
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
          <div>
            <button className={'btn'} onClick={()=>handleSubmit()}>Закончить редактирование</button>
          </div>
      </section>


    </div>

  )
}

LessonsView.propTypes = {
  lessonToEdit: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default LessonsView;