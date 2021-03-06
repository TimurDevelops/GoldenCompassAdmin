import React from 'react';
import PropTypes from "prop-types";
import {FaEdit, FaTimes} from "react-icons/fa";

import './SlideItem.scss';

const SlideItem = ({slide: {_id, tip, img, hasAbacus}, deleteSlide, openSlide}) => {
  return (
    <div className={'slide-item-wrapper'}>
      <div className={'tip'}>
        {tip}
      </div>
      <div className={'img-wrapper'}>
        <div className={'img'}>
          {img ? <img
            src={img}
            alt={'Загружаемое изображение'}
          /> : <div className={'empty-slide'}>Картинка не выбрана</div>}

        </div>
      </div>

      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteSlide()}>
          <FaTimes/>
        </div>
        {!hasAbacus && <div className={'edit-btn'} onClick={() => openSlide()}>
          <FaEdit/>
        </div>}
      </div>
    </div>
  )
}

SlideItem.propTypes = {
  slide: PropTypes.object.isRequired,
  deleteSlide: PropTypes.func.isRequired,
  openSlide: PropTypes.func.isRequired,
};

export default SlideItem;