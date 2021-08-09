import React, {useState} from 'react';
import PropTypes from "prop-types";

import LevelTitleEditor from "./levelTitleEditor/LevelTitleEditor";

import './LevelView.scss';

const LevelView = ({levelToEdit: {_id: id, slides, name: levelTitle}, lessons, editLevel}) => {
  const [newLevelTitle, setNewLevelTitle] = useState(levelTitle);

  const [newSlides, setNewSlides] = useState(slides);

  const handleSubmit = () => {
    editLevel(
      {
        id,
        title: newLevelTitle,
        slides: newSlides,
      }
    )
    setNewSlides([])
  }

  return (

    <div>
      <section className={'form-wrapper'}>

        <div className={'inputs-wrapper'}>
          <LevelTitleEditor
            newLevelTitle={newLevelTitle}
            setNewLevelTitle={setNewLevelTitle}
          />


        </div>
        <div>
          <button className={'btn'} onClick={() => handleSubmit()}>Закончить редактирование</button>
        </div>
      </section>

    </div>

  )
}

LevelView.propTypes = {
  levelToEdit: PropTypes.object.isRequired,
  lessons: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  editLevel: PropTypes.func.isRequired,
};

export default LevelView;