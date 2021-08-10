import React, {useState} from 'react';
import PropTypes from "prop-types";

import AddLevel from "./addLevel/AddLevel";
import LevelsList from "./levelsList/LevelsList";
import LevelView from "./levelView/LevelView";

import Header from "../ui/Header";
import Modal from "../ui/Modal";

const LevelsView = ({createLevel, deleteLevel, editLevel, logout, setAlert, lessons, levels}) => {
  const [addLevelVisible, setAddLevelVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [levelToEdit, setLevelToEdit] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (id) => {
    setModalOpen(true);
    const level = levels.filter(i => i._id === id)[0];

    if (!level) return setAlert('Ошибка при открытии уровня', 'danger')

    setLevelToEdit(level)
  }

  const handleEditLevel = (level) => {
    editLevel(level)
    closeModal()
  }

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>

      <button style={{'margin': '20px'}}
              onClick={() => setAddLevelVisible(!addLevelVisible)}>{addLevelVisible ? 'Закрыть' : 'Добавить уровень'}</button>
      {addLevelVisible && <AddLevel createLevel={createLevel}/>}

      <LevelsList levels={levels} deleteLevel={deleteLevel} openLevel={openModal}/>

      <Modal
        title={`Редактирование уровня: \n ${levelToEdit.name}`}
        open={modalOpen}
        closeModal={closeModal}
        content={
          modalOpen && <LevelView levelToEdit={levelToEdit} lessons={lessons} editLevel={handleEditLevel} setAlert={setAlert}/>
        }
      />
    </div>
  )
}

LevelsView.propTypes = {
  createLevel: PropTypes.func.isRequired,
  deleteLevel: PropTypes.func.isRequired,
  editLevel: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  lessons: PropTypes.array.isRequired,
  levels: PropTypes.array.isRequired,
};

export default LevelsView;