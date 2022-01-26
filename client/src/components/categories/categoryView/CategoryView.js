import React, {useState} from 'react';
import PropTypes from "prop-types";

import CategoryNameEditor from "./categoryNameEditor/CategoryNameEditor";
import CategoriesTeachersList from "./categoriesTeachersList/CategoriesTeachersList";

const CategoryView = ({editCategory, categoryToEdit: {_id: id, name: oldCategoryName, teachers: oldTeachers}}) => {
  const [categoryName, setCategoryName] = useState(oldCategoryName);
  const [teachers, setTeachers] = useState(oldTeachers);

  const handleSubmit = (e) => {
    e.preventDefault()
    editCategory(
      {
        id,
        name: categoryName,
        teachers: teachers.map((teacher) => teacher._id),
      }
    )
  }

  return (
    <div className={'edit-category-form add-form'}>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={'inputs-wrapper'}>
          <CategoryNameEditor
            newCategoryName={categoryName}
            setNewCategoryName={setCategoryName}
          />

          <CategoriesTeachersList teachers={teachers} setTeachers={setTeachers}/>

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

CategoryView.propTypes = {
  categoryToEdit: PropTypes.object.isRequired,
  editCategory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default CategoryView;