import React from 'react';
import PropTypes from "prop-types";

import SlideItem from "./slideItem/SlideItem";

import './SlideList.scss';

const SlideList = ({slides}) => {

  return (
    <div>
      {slides.map(slide => <SlideItem key={slide._id} slide={slide}/>)}
    </div>
  )
}

SlideList.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default SlideList;