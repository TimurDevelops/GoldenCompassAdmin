import React from 'react';
import PropTypes from "prop-types";
import CategoryItem from "./categoryItem/CategoryItem";

const CategoriesList = ({categories, deleteCategory, openCategory}) => {
  return (
    <div className={'categories-list-wrapper'}>
      {
        categories.map(category => <CategoryItem key={category._id} category={category}
                                          deleteCategory={() => deleteCategory(category._id)}
                                          openCategory={() => openCategory(category._id)}/>)
      }
    </div>
  )
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
};

export default CategoriesList;