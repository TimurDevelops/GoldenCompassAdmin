import React, {useState} from 'react';
import PropTypes from "prop-types";

import LevelTitleEditor from "./levelTitleEditor/LevelTitleEditor";
import LevelsLessonsList from "./levelsLessonsList/LevelsLessonsList";

import './LevelView.scss';
import Selector from "../../ui/Selector";

const LevelView = ({editLevel, levelToEdit: {_id: id, name: oldLeveTitle, lessons: oldLessons, category: oldCategory}, categories}) => {
  const [levelTitle, setLevelTitle] = useState(oldLeveTitle);
  const [category, setCategory] = useState();
  const [lessons, setLessons] = useState(oldLessons);

  const onCategoryChange = (value) => {
    setCategory(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editLevel(
      {
        id,
        name: levelTitle,
        lessons: lessons,
        category: category
      }
    )
  }

  const categoryLabel = categories.find(i => i.id === oldCategory)["label"] || 'Выберите категорию...'

  return (
    <div className={'edit-level-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <LevelTitleEditor
            newLevelTitle={levelTitle}
            setNewLevelTitle={setLevelTitle}
          />

          <Selector items={categories} onChange={onCategoryChange}
                    defaultValue={oldCategory}
                    label={categoryLabel}
                    valueField={'id'}/>

          <LevelsLessonsList lessons={lessons} categories={categories} setLessons={setLessons}/>

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
  categories: PropTypes.array.isRequired,
};

export default LevelView;