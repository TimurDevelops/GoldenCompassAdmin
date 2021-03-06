import React, {useState} from 'react';
import PropTypes from "prop-types";

import MyDropzone from "../../../../ui/MyDropzone";
import {serverUrl} from '../../../../../config.json';

import './AddSlide.scss';

const AddSlide = ({createSlide, category}) => {
  const [tip, setTip] = useState();
  const [file, setFile] = useState();
  const [newHasAbacus, setNewHasAbacus] = useState(false);
  const [newHasChessboard, setNewHasChessboard] = useState(false);

  const filePicked = (files) => {
    setFile(files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHasAbacus || newHasChessboard) {
      createSlide({tip, file: `${serverUrl}/slides/abacusBg.jpeg`, hasAbacus: newHasAbacus, hasChessboard: newHasChessboard})
    } else {
      createSlide({tip, file, hasAbacus: newHasAbacus, hasChessboard: newHasChessboard})
    }
  }

  return (
    <div className={'add-slide-wrapper'}>

      <div className={'inputs-wrapper'}>
        {
          category.name === "Ментальная арифметика" && <div className="form-group field abacus">
            <label htmlFor="hasAbacus">Абакус: </label>
            <input type="checkbox" placeholder="Абакус" name="hasAbacus" id='hasAbacus'
                   checked={newHasAbacus}
                   onChange={e => setNewHasAbacus(e.target.checked)}/>
          </div>
        }
        {
          category.name === "Шахматы" && <div className="form-group field abacus">
            <label htmlFor="hasAbacus">Доска: </label>
            <input type="checkbox" placeholder="Доска" name="setNewHasChessboard" id='hasChessboard'
                   checked={newHasChessboard}
                   onChange={e => setNewHasChessboard(e.target.checked)}/>
          </div>
        }

        <div className="form-group field">
          <input autoComplete='off' type="input" className="form-field" placeholder="Подсказка для учителя" name="tip"
                 id='tip'
                 onChange={e => setTip(e.target.value)}/>
          <label htmlFor="tip" className="form-label">Подсказка для учителя</label>
        </div>

        {!newHasAbacus && <MyDropzone filePicked={filePicked}/>}

        <div className='submit-btn-wrapper'>
          <button type={'submit'} className={'btn'} onClick={(e) => handleSubmit(e)}>
            <span>Создать</span>
          </button>
        </div>
      </div>
    </div>
  )
}

AddSlide.propTypes = {
  createSlide: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

export default AddSlide;