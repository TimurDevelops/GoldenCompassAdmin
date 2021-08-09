import React, {useState} from 'react';
import PropTypes from "prop-types";

import MyDropzone from "../../../ui/MyDropzone";

import './AddSlide.scss';

const AddSlide = ({createSlide}) => {
  const [tip, setTip] = useState();
  const [file, setFile] = useState();
  const [newHasAbacus, setNewHasAbacus] = useState();

  const filePicked = (files) => {
    setFile(files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createSlide({tip, file})
  }

  return (
    <div className={'add-slide-wrapper'}>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>

        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input type="input" className="form-field" placeholder="Логин" name="login" id='login'
                   onChange={e => setTip(e.target.value)} required/>
            <label htmlFor="login" className="form-label">Подсказка для учителя</label>
          </div>

          <div className="form-group field">
            <input type="checkbox" className="form-field" placeholder="" name="hasAbacus" id='hasAbacus'
                   value={newHasAbacus}
                   onChange={e => setNewHasAbacus(e.target.value)}/>
            <label htmlFor="hasAbacus" className="form-label">Абакус: </label>
          </div>

          <MyDropzone filePicked={filePicked}/>

          <div className='submit-btn-wrapper'>
            <button type={'submit'} className={'btn'}>
              <span>Создать</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

AddSlide.propTypes = {
  createSlide: PropTypes.func.isRequired,
};

export default AddSlide;