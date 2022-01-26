import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddCategory from "./addCategory/AddCategory";

import api from "../../utils/api";

const CategoriesView = ({logout, setAlert}) => {
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const createCategory = async ({categoryTitle}) => {
    try {
      const res = await api.post('/categories', {name: categoryTitle});
      const newCategory = res.data.lesson;
      setCategories([...categories, newCategory]);
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }
  return (
    <div>
      <Header logout={logout}/>
      <div className={'view-content'}>
        <div className={'view-content-inner'}>
          <button className={'btn'}
                  onClick={() => setAddCategoryVisible(!addCategoryVisible)}>{addCategoryVisible ? 'Закрыть' : 'Добавить категорию'}
          </button>

          {addCategoryVisible && <AddCategory createCategory={createCategory} />}

        </div>
      </div>
    </div>
  )
}

CategoriesView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default CategoriesView;