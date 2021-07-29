import React, {useState} from 'react';
import PropTypes from "prop-types";

import SlideList from "./slideList/SlideList";
import AddSlide from "./addSlide/AddSlide";
import Modal from "../../ui/Modal";
import SlideView from "./slideView/SlideView";

import './SlideEditor.scss'
import {v4 as uuidv4} from "uuid";

const SlidesEditor = ({slides, setSlides, setAlert}) => {
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

  const createSlide = async ({tip, file}) => {
    setSlides([...slides, {tip, img: file.preview, _id: uuidv4()}]);
  }

  const deleteSlide = async () => {

  }

  const editSlide = async () => {

  }

  const setSlidesOrder = (slides) => {
    setSlides(slides);
  }

  return (
    <div className={'slides-wrapper'}>

      <button className={'add-slide-btn'}
              onClick={() => setAddingSlide(!addingSlide)}>{addingSlide ? 'Закрыть' : 'Добавить слайд'}</button>
      {addingSlide && <AddSlide createSlide={(slide) => createSlide(slide)}/>}


      {slides.length ?
        <SlideList
          slides={slides}
          openSlide={openModal}
          setSlidesOrder={setSlidesOrder}
          deleteSlide={deleteSlide}
        />
        : ''}

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
  slides: PropTypes.array.isRequired,
  setSlides: PropTypes.func.isRequired,
};

export default SlidesEditor;