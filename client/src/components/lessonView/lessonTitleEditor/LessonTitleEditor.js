import React, {useState} from 'react';
import PropTypes from "prop-types";
import {FaEdit, FaTimes, FaCheck} from "react-icons/fa";

import './LessonTitleEditor.scss';

const LessonTitleEditor = ({lessonTitle, newLessonTitle, setNewLessonTitle}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [savedTitle, setSavedTitle] = useState(newLessonTitle);

  return (
    <div className={'title-wrapper'} id={'title-wrapper'}>
      {editingTitle
        ?
        <div className={'editing-wrapper'}>
          <div className={'close-btn'}
               onClick={() => {
                 setEditingTitle(false)
                 setNewLessonTitle(savedTitle)
               }}>
            <FaTimes/>
          </div>
          <div className={'confirm-btn'}
               onClick={(e) => {
                 setEditingTitle(false)
                 setSavedTitle(newLessonTitle)
               }}>
            <FaCheck/>
          </div>
        </div>
        :
        <div className={'non-editing-wrapper'}>
          <div className={'title-label'}>Название урока: </div>
          <div className={'title-placeholder'}>
            {newLessonTitle}
          </div>
          <div className={'edit-btn'} onClick={() => {
            setEditingTitle(true)
            setSavedTitle(newLessonTitle)
          }}>
            <FaEdit/>
          </div>
        </div>
      }

      {editingTitle && <div className="form-group field">
        <input type="input" className="form-field" placeholder="Название урока" name="lessonTitle"
               id='lessonTitle'
               value={newLessonTitle}
               onChange={e => setNewLessonTitle(e.target.value)} required/>
        <label htmlFor="lessonTitle" className="form-label">Название урока</label>
      </div>}
    </div>
  )

}

LessonTitleEditor.propTypes = {
  lessonTitle: PropTypes.string.isRequired,
  newLessonTitle: PropTypes.string.isRequired,
  setNewLessonTitle: PropTypes.func.isRequired,
};

export default LessonTitleEditor;
