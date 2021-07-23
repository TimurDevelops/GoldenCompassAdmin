import React, {useState} from 'react';
import PropTypes from "prop-types";
import {FaEdit, FaTimes, FaCheck} from "react-icons/fa";

import './LessonEditor.scss';

const LessonTitleEditor = ({lessonTitle, newLessonTitle, setNewLessonTitle}) => {
  const [editingTitle, setEditingTitle] = useState(false);

  let savedTitle = lessonTitle;

  return (
    <div className={'title-wrapper'}>
      {editingTitle
        ?
        <div>
          <div className={'icon-btn'}
               onClick={() => {
                 setEditingTitle(false)
                 setNewLessonTitle(savedTitle)
               }}>
            <FaTimes/>
          </div>
          <div className={'edit-btn'} onClick={() => setEditingTitle(false)}>
            <FaCheck/>
          </div>
        </div>
        :
        <div className={'icon-btn'} onClick={() => {
          setEditingTitle(true)
          savedTitle = newLessonTitle
        }}>
          <FaEdit/>
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
