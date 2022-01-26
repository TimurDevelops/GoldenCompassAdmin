import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddCategory = ({createCategory}) => {
  const [categoryTitle, setCategoryTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    createCategory({categoryTitle});
  }

  return (
    <div className={'add-lesson-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Название категории" name="category" id='category'
                   onChange={e => setCategoryTitle(e.target.value)} required/>
            <label htmlFor="category" className="form-label">Название категории</label>
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

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

export default AddCategory;