import React from 'react';
import PropTypes from "prop-types";

import './SlideItem.scss';

const SlideItem = ({slide: {_id, tip, img}}) => {
  return (
    <div className={'slide-item-wrapper'}>
      <div className={'tip'}>
        {tip}
      </div>
      <div className={'img-wrapper'}>
        <div className={'img'}>
          <img
            src={img.preview || img}
            alt={'Загружаемое изображение'}
          />
        </div>
      </div>
    </div>
  )
}

SlideItem.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default SlideItem;