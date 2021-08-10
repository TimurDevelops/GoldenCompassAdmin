import React, {useState} from 'react';
import PropTypes from "prop-types";

import MyDropzone from "../../../../ui/MyDropzone";

import './AddSlide.scss';

const AddSlide = ({createSlide}) => {
  const [tip, setTip] = useState();
  const [file, setFile] = useState();
  const [newHasAbacus, setNewHasAbacus] = useState(false);

  const filePicked = (files) => {
    setFile(files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createSlide({tip, file, hasAbacus: newHasAbacus})
  }

  return (
    <div className={'add-slide-wrapper'}>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>

        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Подсказка для учителя" name="tip" id='tip'
                   onChange={e => setTip(e.target.value)} required/>
            <label htmlFor="tip" className="form-label">Подсказка для учителя</label>
          </div>

          <div className="form-group field abacus">
            <label htmlFor="hasAbacus" >Абакус: </label>
            <input type="checkbox" placeholder="Абакус" name="hasAbacus" id='hasAbacus'
                   checked={newHasAbacus}
                   onChange={e => setNewHasAbacus(e.target.checked)}/>
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