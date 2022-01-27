import React, {useState} from 'react';
import PropTypes from "prop-types";

import LessonTitleEditor from "./lessonTitleEditor/LessonTitleEditor";
import SlidesEditor from "./slidesEditor/SlidesEditor";

import './LessonView.scss';
import Selector from "../../ui/Selector";


const LessonView = ({lessonToEdit: {_id: id, slides, name: lessonTitle, category}, categories, setAlert, editLesson}) => {
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);
  const [newCategory, setNewCategory] = useState(category);
  const [newSlides, setNewSlides] = useState(slides);

  const onCategoryChange = (value) => {
      setNewCategory(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editLesson(
      {
        id,
        title: newLessonTitle,
        slides: newSlides,
        category: newCategory
      }
    )
    setNewSlides([])
  }

  const label = categories.find(i => i._id === category).name || 'Выберите категорию...'

  return (
    <div className={'edit-lesson-form add-form'}>

      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <LessonTitleEditor
            newLessonTitle={newLessonTitle}
            setNewLessonTitle={setNewLessonTitle}
          />

          <Selector items={categories} onChange={onCategoryChange}
                    defaultValue={category}
                    label={label}
                    valueField={'id'}/>

          <SlidesEditor slides={newSlides} setSlides={setNewSlides} setAlert={setAlert} category={newCategory}/>

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
  categories: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired
};

export default LessonView;