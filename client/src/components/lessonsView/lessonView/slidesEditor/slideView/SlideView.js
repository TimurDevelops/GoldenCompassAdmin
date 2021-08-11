import React, {useState} from 'react';
import PropTypes from "prop-types";
import MyDropzone from "../../../../ui/MyDropzone";

import './SlideView.scss';

const SlideView = ({slide: {_id, tip, img, hasAbacus}, editSlide, closeForm}) => {
  const [newTip, setNewTip] = useState(tip);
  const [newFile, setNewFile] = useState(img);
  const [newHasAbacus, setNewHasAbacus] = useState(hasAbacus);
  console.log(newHasAbacus)
  const filePicked = (files) => {
    setNewFile(files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editSlide({id: _id, tip: newTip, file: newFile, hasAbacus: newHasAbacus})
    closeForm();
  }
  return (
    <div className={'slide-editor add-slide-wrapper'}>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>

        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input autoComplete='off' type="input" className="form-field" placeholder="Подсказка для учителя" name="tip"
                   id='tip'
                   value={newTip}
                   onChange={e => setNewTip(e.target.value)} required/>
            <label htmlFor="tip" className="form-label">Подсказка для учителя</label>
          </div>

          <div className="form-group field abacus">
            <label htmlFor="hasAbacusEdit">Абакус: </label>
            <input type="checkbox" placeholder="Абакус" name="hasAbacusEdit" id='hasAbacusEdit'
                   checked={newHasAbacus}
                   onChange={e => setNewHasAbacus(e.target.checked)}/>
          </div>

          <MyDropzone showPreview={false} filePicked={filePicked}/>

          {newFile && <div className={'preview'}>
            <div className={'preview-inner'}>
              <img
                src={newFile}
                alt={'Загружаемое изображение'}
              />
            </div>
          </div>}
        </div>

        <div className='submit-btn-wrapper'>
          <button type='submit' className='btn'>
            <span>Закончить редактирование</span>
          </button>
        </div>
      </form>
    </div>
  )
}

SlideView.propTypes = {
  slide: PropTypes.object.isRequired,
  editSlide: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default SlideView;
