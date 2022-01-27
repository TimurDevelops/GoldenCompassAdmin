import React, {useState} from 'react';
import PropTypes from "prop-types";
import Selector from "../../ui/Selector";

const AddLesson = ({createLesson, categories}) => {
  const [lessonTitle, setLessonTitle] = useState();
  const [category, setCategory] = useState();

  const onCategoryChange = (categoryId) => {
    setCategory(categories.find(i => i._id === categoryId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createLesson({lessonTitle, category: category._id});
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

          <Selector items={categories}
                    onChange={onCategoryChange}
                    label={category ? category["name"] : 'Выберите категорию...'}
                    valueField={'_id'}/>

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
  createLesson: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default AddLesson;