import React, {useState} from 'react';
import PropTypes from "prop-types";

import LevelTitleEditor from "./levelTitleEditor/LevelTitleEditor";
import LevelsLessonsList from "./levelsLessonsList/LevelsLessonsList";

import './LevelView.scss';

const LevelView = ({editLevel, levelToEdit: {_id: id, name: oldLeveTitle, lessons: oldLessons}}) => {
  const [levelTitle, setLevelTitle] = useState(oldLeveTitle);
  const [lessons, setLessons] = useState(oldLessons);

  const handleSubmit = () => {
    editLevel(
      {
        id,
        name: levelTitle,
        lessons: lessons,
      }
    )
  }

  return (

    <div>
      <section className={'form-wrapper'}>

        <div className={'inputs-wrapper'}>
          <LevelTitleEditor
            newLevelTitle={levelTitle}
            setNewLevelTitle={setLevelTitle}
          />

          <LevelsLessonsList lessons={lessons} setLessons={setLessons}/>

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
  setAlert: PropTypes.func.isRequired,
  editLevel: PropTypes.func.isRequired,
};

export default LevelView;