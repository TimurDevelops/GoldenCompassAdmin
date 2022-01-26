import React from 'react';
import PropTypes from "prop-types";
import {FaTimes, FaEdit} from 'react-icons/fa';

const CategoryItem = ({category, deleteCategory, openCategory}) => {
  return (
    <div className={'category-wrapper item-wrapper'}>
      <h4 className={'category-title'}>{category.name}</h4>
      <div className={'btn-wrapper'}>
        <div className={'delete-btn'} onClick={() => deleteCategory()}>
          <FaTimes/>
        </div>
        <div className={'edit-btn'} onClick={() => openCategory()}>
          <FaEdit/>
        </div>
      </div>
    </div>
  )
}

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
};

export default CategoryItem;