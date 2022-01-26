import React, {useState} from 'react';
import PropTypes from "prop-types";
import {FaEdit, FaTimes, FaCheck} from "react-icons/fa";

import "./CategoryNameEditor.scss"

const CategoryNameEditor = ({newCategoryName, setNewCategoryName}) => {
  const [editingName, setEditingName] = useState(false);
  const [savedName, setSavedName] = useState(newCategoryName);

  return (
    <div className={'title-wrapper'} id={'category-wrapper'}>
      {editingName
        ?
        <div className={'editing-wrapper'}>
          <div className={'close-btn'}
               onClick={() => {
                 setEditingName(false)
                 setNewCategoryName(savedName)
               }}>
            <FaTimes/>
          </div>
          <div className={'confirm-btn'}
               onClick={() => {
                 setEditingName(false)
                 setSavedName(newCategoryName)
               }}>
            <FaCheck/>
          </div>
        </div>
        :
        <div className={'non-editing-wrapper'}>
          <div className={'title-label'}>Название категории: </div>
          <div className={'title-placeholder'}>
            {newCategoryName}
          </div>
          <div className={'edit-btn'} onClick={() => {
            setEditingName(true)
            setSavedName(newCategoryName)
          }}>
            <FaEdit/>
          </div>
        </div>
      }

      {editingName && <div className="form-group field">
        <input autoComplete='off' type="input" className="form-field" placeholder="Название категории"
               name="categoryName"
               id='levelName'
               value={newCategoryName}
               onChange={e => setNewCategoryName(e.target.value)} required/>
        <label htmlFor="levelName" className="form-label">Название категории</label>
      </div>}
    </div>
  )

}

CategoryNameEditor.propTypes = {
  newCategoryName: PropTypes.string.isRequired,
  setNewCategoryName: PropTypes.func.isRequired,
};

export default CategoryNameEditor;
