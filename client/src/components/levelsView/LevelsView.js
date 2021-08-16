import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

import AddLevel from "./addLevel/AddLevel";
import LevelsList from "./levelsList/LevelsList";
import LevelView from "./levelView/LevelView";

import Modal from "../ui/Modal";

import api from "../../utils/api";

const LevelsView = ({logout, setAlert}) => {
  const [addLevelVisible, setAddLevelVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [levelToEdit, setLevelToEdit] = useState({});
  const [levels, setLevels] = useState([]);

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
    const getLevels = async () => {
      const res = await api.post('/levels/get-levels');
      setLevels(res.data.levels);
    }
    getLevels().catch((err) => console.error(err))

  }, []);

  const createLevel = async ({levelTitle}) => {
    try {
      const res = await api.post('/levels', {name: levelTitle});
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

  const editLevel = async ({id, name, lessons}) => {
    const newLessons = lessons.map(lesson => lesson._id)
    let createdLevel;
    try {
      const res = await api.put('/levels', {id, name, lessons: newLessons});
      createdLevel = res.data.level;
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    closeModal()
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

          <button className={'btn'}
                  onClick={() => setAddLevelVisible(!addLevelVisible)}>{addLevelVisible ? 'Закрыть' : 'Добавить уровень'}</button>
          {addLevelVisible && <AddLevel createLevel={createLevel}/>}

          <LevelsList levels={levels} deleteLevel={deleteLevel} openLevel={openModal}/>

          <Modal
            title={`Редактирование уровня: \n ${levelToEdit.name}`}
            open={modalOpen}
            closeModal={closeModal}
            content={
              modalOpen &&
              <LevelView levelToEdit={levelToEdit} editLevel={editLevel} setAlert={setAlert}/>
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