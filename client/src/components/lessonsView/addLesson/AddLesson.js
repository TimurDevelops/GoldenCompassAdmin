import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddLesson = ({createLesson}) => {
  const [lessonTitle, setLessonTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    createLesson({lessonTitle});
  }

  return (
    <div className={'add-lesson-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Название урока" name="login" id='login'
                   onChange={e => setLessonTitle(e.target.value)} required/>
            <label htmlFor="login" className="form-label">Название Урока</label>
          </div>

          <div className='submit-btn-wrapper'>
            <button type="submit" className='btn' id='addLesson'>
              <span>Создать</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

AddLesson.propTypes = {
  createLesson: PropTypes.func.isRequired
};

export default AddLesson;