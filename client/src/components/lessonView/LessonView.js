import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';


const LessonsView = ({lessonToEdit: {slides, lessonTitle}, setAlert}) => {
  const history = useHistory();
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);

  const [newSlides, setNewSlides] = useState(slides);

  console.log({slides, lessonTitle})

  const goBack = () => {
    if (slides !== newSlides || lessonTitle !== newLessonTitle && window.confirm('Выйти не сохранив изменения?')) {
      history.push("/main-view");
    } else {
      history.push("/main-view");
    }
  }

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
      <header className={'lesson-view-header'}>
        <div className={"menu-item underline"} onClick={() => goBack()}>
          <a>Вернуться</a>
        </div>
      </header>

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