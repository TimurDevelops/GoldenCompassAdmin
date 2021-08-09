import React from 'react';
import PropTypes from "prop-types";
import {FaTimes, FaEdit} from 'react-icons/fa';

import './LevelItem.scss';

const LevelItem = ({level, deleteLevel, openLevel}) => {
  return (
    <div className={'level-wrapper'}>
      <h4 className={'level-title'}>{level.name}</h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteLevel()}>
          <FaTimes/>
        </div>
        <div className={'edit-btn'} onClick={() => openLevel()}>
          <FaEdit/>
        </div>
      </div>
    </div>
  )
}

LevelItem.propTypes = {
  level: PropTypes.object.isRequired,
  deleteLevel: PropTypes.func.isRequired,
  openLevel: PropTypes.func.isRequired,
};

export default LevelItem;