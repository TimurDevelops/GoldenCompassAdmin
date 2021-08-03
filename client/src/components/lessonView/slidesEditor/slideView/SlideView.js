import React, {useState} from 'react';
import PropTypes from "prop-types";
import MyDropzone from "../../../ui/MyDropzone";

import './SlideView.scss';

const SlideView = ({slide: {_id, tip, img}, editSlide, closeForm}) => {
  const [newTip, setNewTip] = useState(tip);
  const [newFile, setNewFile] = useState(img);

  const filePicked = (files) => {
    setNewFile(files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editSlide({id: _id, tip: newTip, file: newFile})
    closeForm();
  }
  return (

    <div className={'slide-editor add-slide-wrapper'}>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>

        <div className={'inputs-wrapper'}>
          <div className="form-group field">
            <input type="input" className="form-field" placeholder="Логин" name="login" id='login'
                   value={newTip}
                   onChange={e => setNewTip(e.target.value)} required/>
            <label htmlFor="login" className="form-label">Подсказка для учителя</label>
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

          <div className='submit-btn-wrapper'>
            <button type={'submit'} className={'btn'}>
              <span>Закончить редактирование</span>
            </button>
          </div>
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
