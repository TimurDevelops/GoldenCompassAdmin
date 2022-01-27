import React, {useState} from 'react';
import PropTypes from "prop-types";
import Selector from "../../ui/Selector";

const AddLevel = ({createLevel, categories}) => {
  const [levelTitle, setLevelTitle] = useState();
  const [category, setCategory] = useState();

  const onCategoryChange = (categoryId) => {
    setCategory(categories.find(i => i._id === categoryId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createLevel({levelTitle, category: category._id});
  }

  return (
    <div className={'add-level-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field"
                   placeholder="Название уровня" name="levelName" id='levelName'
                   onChange={e => setLevelTitle(e.target.value)} required/>
            <label htmlFor="levelName" className="form-label">Название уровня</label>
          </div>

          <Selector items={categories}
                    onChange={onCategoryChange}
                    label={category ? category["name"] : 'Выберите категорию...'}
                    valueField={'_id'}/>

          <div className='submit-btn-wrapper'>
            <button type="submit" className='btn' id='addLevel'>
              <span>Создать</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

AddLevel.propTypes = {
  createLevel: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddLevel;