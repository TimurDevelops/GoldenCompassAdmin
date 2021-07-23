import React from 'react';
import PropTypes from "prop-types";

import './SlideView.scss';

const SlideView = ({slide: {_id, tip, img}, editSlide}) => {

  return (
    <div>

    </div>
  )
}

SlideView.propTypes = {
  slide: PropTypes.object.isRequired,
  editSlide: PropTypes.func.isRequired,
};

export default SlideView;