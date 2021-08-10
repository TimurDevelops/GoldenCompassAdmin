import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddLevel = ({createLevel}) => {
  const [levelTitle, setLevelTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    createLevel({levelTitle});
  }

  return (
    <div className={'add-level-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Название уровня" name="levelName" id='levelName'
                   onChange={e => setLevelTitle(e.target.value)} required/>
            <label htmlFor="levelName" className="form-label">Название уровня</label>
          </div>

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
  createLevel: PropTypes.func.isRequired
};

export default AddLevel;