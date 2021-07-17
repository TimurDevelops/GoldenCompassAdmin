import React, {useState} from 'react';
import PropTypes from "prop-types";

import './EditLesson.scss';

const EditSlide = ({slideId, img, tip, deleteSlide, confirm}) => {

  return (
    <div>
      {img}
      {tip}
    </div>
  )
}

EditSlide.propTypes = {
  slideId: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  deleteSlide: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default EditSlide;