import React, {useState} from 'react';
import PropTypes from "prop-types";
import {FaEdit, FaTimes, FaCheck} from "react-icons/fa";

import './LevelTitleEditor.scss';

const LevelTitleEditor = ({newLevelTitle, setNewLevelTitle}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [savedTitle, setSavedTitle] = useState(newLevelTitle);

  return (
    <div className={'title-wrapper'} id={'title-wrapper'}>
      {editingTitle
        ?
        <div className={'editing-wrapper'}>
          <div className={'close-btn'}
               onClick={() => {
                 setEditingTitle(false)
                 setNewLevelTitle(savedTitle)
               }}>
            <FaTimes/>
          </div>
          <div className={'confirm-btn'}
               onClick={() => {
                 setEditingTitle(false)
                 setSavedTitle(newLevelTitle)
               }}>
            <FaCheck/>
          </div>
        </div>
        :
        <div className={'non-editing-wrapper'}>
          <div className={'title-label'}>Название уровня: </div>
          <div className={'title-placeholder'}>
            {newLevelTitle}
          </div>
          <div className={'edit-btn'} onClick={() => {
            setEditingTitle(true)
            setSavedTitle(newLevelTitle)
          }}>
            <FaEdit/>
          </div>
        </div>
      }

      {editingTitle && <div className="form-group field">
        <input type="input" className="form-field" placeholder="Название уровня" name="levelTitle"
               id='levelTitle'
               value={newLevelTitle}
               onChange={e => setNewLevelTitle(e.target.value)} required/>
        <label htmlFor="levelTitle" className="form-label">Название уровня</label>
      </div>}
    </div>
  )

}

LevelTitleEditor.propTypes = {
  newLevelTitle: PropTypes.string.isRequired,
  setNewLevelTitle: PropTypes.func.isRequired,
};

export default LevelTitleEditor;
