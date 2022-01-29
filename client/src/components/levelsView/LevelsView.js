import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddLevel from "./addLevel/AddLevel";
import LevelsList from "./levelsList/LevelsList";
import LevelView from "./levelView/LevelView";

import Modal from "../ui/Modal";

import api from "../../utils/api";
import Selector from "../ui/Selector";

const LevelsView = ({logout, setAlert}) => {
  const [addLevelVisible, setAddLevelVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [levelToEdit, setLevelToEdit] = useState({});
  const [levels, setLevels] = useState([]);
  const [visibleLevels, setVisibleLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const onCategoryChange = (categoryId) => {
    setCategory(categories.find(i => i._id === categoryId))
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const level = levels.filter(i => i._id === id)[0];

    if (!level) return setAlert('Ошибка при открытии уровня', 'danger')

    setLevelToEdit(level)
  }

  useEffect(() => {
    console.log(levels)
    setVisibleLevels(levels.filter(i => i.category === category._id))
  }, [levels, category]);

  useEffect(() => {
    const getLevels = async () => {
      const res = await api.post('/levels/get-levels');
      setLevels(res.data.levels);
    }
    getLevels().catch((err) => console.error(err))

  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.post('/categories/get-categories');
      setCategories(res.data.categories);
    }
    getCategories().catch((err) => console.error(err))

  }, []);

  const createLevel = async ({levelTitle, category}) => {
    try {
      const res = await api.post('/levels', {name: levelTitle, category});
      console.log(res)
      const newLevel = res.data.level;
      setLevels([...levels, newLevel])
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const deleteLevel = async (levelId) => {
    try {
      await api.delete('/levels', {
        headers: {},
        data: {
          levelId
        },
      });
      setLevels(levels.filter(level => level._id !== levelId))
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
  }

  const editLevel = async ({id, name, lessons, category}) => {
    const newLessons = lessons.map(lesson => lesson._id)
    let createdLevel;
    try {
      const res = await api.put('/levels', {id, name, lessons: newLessons, category});
      console.log(res)
      createdLevel = res.data.level;
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    closeModal()
    console.log(createdLevel)
    setLevels(levels.map((level) => {
      if (level._id === id) return createdLevel;
      else return level;
    }))
  }

  return (
    <div>
      <Header logout={logout}/>

      <div className={'view-content'}>
        <div className={'view-content-inner'}>

          <Selector items={categories}
                    onChange={onCategoryChange}
                    label={category ? category["name"] : null}
                    valueField={'_id'}/>

          <button className={'btn'}
                  onClick={() => setAddLevelVisible(!addLevelVisible)}>{addLevelVisible ? 'Закрыть' : 'Добавить уровень'}</button>
          {addLevelVisible && <AddLevel createLevel={createLevel} category={category}/>}

          <LevelsList levels={visibleLevels} deleteLevel={deleteLevel} openLevel={openModal}/>

          <Modal
            title={`Редактирование уровня: \n ${levelToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen &&
              <LevelView levelToEdit={levelToEdit} category={category} editLevel={editLevel} setAlert={setAlert}/>
            }
          />

        </div>
      </div>
    </div>
  )
}

LevelsView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default LevelsView;