import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";
import Modal from "../ui/Modal";

import AddCategory from "./addCategory/AddCategory";
import CategoriesList from "./categoriesList/CategoriesList";
import CategoryView from "./categoryView/CategoryView";

import api from "../../utils/api";

const CategoriesView = ({logout, setAlert}) => {
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [categories, setCategories] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const category = categories.filter(i => i._id === id)[0];

    if (!category) return setAlert('Ошибка при открытии категории', 'danger')

    setCategoryToEdit(category)
  }

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.post('/categories/get-categories');
      setCategories(res.data.categories);
    }
    getCategories().catch((err) => console.error(err))

  }, []);

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

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete('/categories', {
        headers: {},
        data: {categoryId},
      });
    } catch (e) {
      console.log(e)
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    setCategories(categories.filter(category => category._id !== categoryId))
  }

  const editCategory = async (newCategory) => {
    let createdCategory;
    try {
      const res = await api.put('/categories', newCategory);
      createdCategory = res.data.category;

    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    closeModal()
    setCategories(categories.map((category) => {
      if (category._id === newCategory.id) return createdCategory;
      else return category;
    }))
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

          <CategoriesList categories={categories} deleteCategory={deleteCategory} openCategory={openModal}/>

          <Modal
            title={`Редактирование урока: \n ${categoryToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen && <CategoryView categoryToEdit={categoryToEdit} editCategory={editCategory} setAlert={setAlert}/>
            }
          />

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