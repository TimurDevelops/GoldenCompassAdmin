import React, {useState} from 'react';
import PropTypes from "prop-types";

import LevelTitleEditor from "./levelTitleEditor/LevelTitleEditor";
import LevelsLessonsList from "./levelsLessonsList/LevelsLessonsList";

import './LevelView.scss';

const LevelView = ({editLevel, levelToEdit: {_id: id, name: oldLeveTitle, lessons: oldLessons}, category}) => {
  const [levelTitle, setLevelTitle] = useState(oldLeveTitle);
  const [lessons, setLessons] = useState(oldLessons);

  const handleSubmit = (e) => {
    e.preventDefault()
    editLevel(
      {
        id,
        name: levelTitle,
        lessons: lessons,
        category
      }
    )
  }


  return (
    <div className={'edit-level-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <LevelTitleEditor
            newLevelTitle={levelTitle}
            setNewLevelTitle={setLevelTitle}
          />

          <LevelsLessonsList lessons={lessons} category={category} setLessons={setLessons}/>

        </div>

        <div className='submit-btn-wrapper'>
          <button type="submit" className='btn'>
            <span>Закончить редактирование</span>
          </button>
        </div>
      </form>
    </div>
  )
}

LevelView.propTypes = {
  levelToEdit: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editLevel: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

export default LevelView;