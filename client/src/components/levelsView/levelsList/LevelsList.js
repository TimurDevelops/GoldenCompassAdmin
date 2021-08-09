import React from 'react';
import PropTypes from "prop-types";
import LevelItem from "./levelItem/LevelItem";

import './LevelsList.scss';

const LevelsList = ({levels, deleteLevel, openLevel}) => {
  return (
    <div className={'levels-list-wrapper'}>
      <h3 className={'list-header'}>Список уроков</h3>
      <div className={'levels-list-wrapper'}>
        {
          levels.map(level => <LevelItem key={level._id} level={level}
                                            deleteLevel={() => deleteLevel(level._id)}
                                            openLevel={() => openLevel(level._id)}/>)
        }
      </div>
    </div>
  )
}

LevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
  deleteLevel: PropTypes.func.isRequired,
  openLevel: PropTypes.func.isRequired,
};

export default LevelsList;