import React, {useState} from 'react';
import PropTypes from "prop-types";

import SlideList from "./slideList/SlideList";
import AddSlide from "./addSlide/AddSlide";
import Modal from "../../ui/Modal";
import SlideView from "./slideView/SlideView";

const SlidesEditor = ({slides, createSlide, deleteSlide, editSlide, setAlert}) => {
  const [addingSlide, setAddingSlide] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [slideToEdit, setSlideToEdit] = useState({});


  const closeModal = () => {
    setModalOpen(false);
  }
  const openModal = (id) => {
    setModalOpen(false);
    const slide = slides.filter(i => i._id === id)[0];

    if (!slide) return setAlert('Ошибка при открытии слайда', 'danger')

    setSlideToEdit(slide)
  }

  return (
    <div className={'slides-wrapper'}>

      <button style={{'margin': '20px'}}
              onClick={() => setAddingSlide(!addingSlide)}>{addingSlide ? 'Закрыть' : 'Добавить слайд'}</button>
      {addingSlide && <AddSlide createSlide={createSlide}/>}


      <SlideList slides={slides} deleteSlide={deleteSlide} openSlide={openModal}/>

      <Modal
        title={`Редактирование слайда \n ${slideToEdit.name}`}
        open={modalOpen}
        closeModal={closeModal}
        content={
          <SlideView
            slide={slideToEdit}
            editSlide={editSlide}
          />
        }
      />

    </div>
  )
}

SlidesEditor.propTypes = {
  slides: PropTypes.object.isRequired,
  createSlide: PropTypes.func.isRequired,
  deleteSlide: PropTypes.func.isRequired,
  editSlide: PropTypes.func.isRequired,
};

export default SlidesEditor;