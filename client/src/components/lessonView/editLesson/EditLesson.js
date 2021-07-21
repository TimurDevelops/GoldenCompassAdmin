import React, {useState} from 'react';
import PropTypes from "prop-types";

import EditSlide from "./editSlide/EditSlide";

import './EditLesson.scss';
import {v4 as uuidv4} from "uuid";

const EditLesson = ({lessonId, lessonTitle, slides, editLesson}) => {
  const [newLessonTitle, setLessonTitle] = useState(lessonTitle);
  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = (e) => {
    e.preventDefault()
    editLesson(lessonId, newLessonTitle, newSlides)
  }

  const addSlide = () => {
    setNewSlides([...newSlides, {_id: uuidv4()}])
  }

  const confirmSlide = (id, img, tip) => {
    setNewSlides(
      [
        ...newSlides.map((i) => {
          if (i._id === id) {
            return {id, img, tip}
          }
          return i;
        })
      ]
    )

  }

  return (
    <div>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input type="input" className="form-field" placeholder="Название урока" name="login" id='login'
                   value={newLessonTitle}
                   onChange={e => setLessonTitle(e.target.value)} required/>
            <label htmlFor="login" className="form-label">Логин</label>
          </div>

          {newSlides.map(slide => <EditSlide
            key={slide._id}

            confirm={(id, img, tip) => {
              confirmSlide(id, img, tip)
            }}

          />)}

          <button className={'add-slide-button'} onClick={() => {
            addSlide()
          }}>Добавить
          </button>

          <div className='submit-btn-wrapper'>
            <button type="submit" className='btn' id='loginBtn'>
              <span>Завершить</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

EditLesson.propTypes = {
  lessonId: PropTypes.string.isRequired,
  lessonTitle: PropTypes.string.isRequired,
  slides: PropTypes.array.isRequired,
  editLesson: PropTypes.func.isRequired,
};

export default EditLesson;