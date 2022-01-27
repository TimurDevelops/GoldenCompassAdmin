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
  const categoryLabel = categories.find(i => i._id === oldCategory)["name"] || 'Выберите категорию...'
  const [label, setLabel] = useState(categoryLabel);

  const onCategoryChange = (value) => {
    const categoryLabel = categories.find(i => i._id === value)["name"] || 'Выберите категорию...'
    setLabel(categoryLabel)
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


  return (
    <div className={'edit-level-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <LevelTitleEditor
            newLevelTitle={levelTitle}
            setNewLevelTitle={setLevelTitle}
          />

          <Selector items={categories}
                    onChange={onCategoryChange}
                    label={label}
                    valueField={'_id'}/>

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