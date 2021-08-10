import React from "react";
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

const TeachersLevelItem = ({level, deleteLevel}) => {
  return (
    <div className={'teacher-level-item inline-item'}>
      <div className={'label'}>{level.name}</div>

      <div className={'delete-btn'} onClick={deleteLevel}>
        <FaTimes/>
      </div>

    </div>
  )
}


TeachersLevelItem.propTypes = {
  level: PropTypes.object.isRequired,
  deleteLevel: PropTypes.func.isRequired,
};

export default TeachersLevelItem;