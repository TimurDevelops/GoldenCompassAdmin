import React from 'react';
import PropTypes from "prop-types";
import LevelItem from "./levelItem/LevelItem";

const LevelsList = ({levels, deleteLevel, openLevel}) => {
  return (
    <div className={'levels-list-wrapper'}>
      {
        levels.map(level => <LevelItem key={level._id} level={level}
                                          deleteLevel={() => deleteLevel(level._id)}
                                          openLevel={() => openLevel(level._id)}/>)
      }
    </div>
  )
}

LevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
  deleteLevel: PropTypes.func.isRequired,
  openLevel: PropTypes.func.isRequired,
};

export default LevelsList;