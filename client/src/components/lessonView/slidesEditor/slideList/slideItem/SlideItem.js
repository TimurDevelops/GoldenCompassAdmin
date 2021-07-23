import React from 'react';
import PropTypes from "prop-types";

import './SlideItem.scss';

const SlideItem = ({slide: {_id, tip, img}}) => {

  return (
    <div>

    </div>
  )
}

SlideItem.propTypes = {
  slide: PropTypes.array.isRequired,
};

export default SlideItem;