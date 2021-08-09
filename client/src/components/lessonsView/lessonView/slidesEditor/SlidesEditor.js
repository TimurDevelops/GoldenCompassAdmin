import React, {useState} from 'react';
import PropTypes from "prop-types";

import SlideList from "./slideList/SlideList";
import AddSlide from "./addSlide/AddSlide";
import Modal from "../../../ui/Modal";
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
    setModalOpen(true);
    const slide = slides.filter(i => i._id === id)[0];

    if (!slide) return setAlert('Ошибка при открытии слайда', 'danger')

    setSlideToEdit(slide)
  }

  const createSlide = async ({tip, file, hasAbacus}) => {
    setSlides([...slides, {tip, img: file, hasAbacus, _id: uuidv4()}]);
  }

  const deleteSlide = async (id) => {
    setSlides(slides.filter(slide => slide._id !== id));
  }

  const editSlide = async ({id, tip, file, hasAbacus}) => {

    setSlides(slides.map(slide => {
      if (slide._id === id) return {_id: id, tip, img: file, hasAbacus}
      else return slide
    }));
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
          setSlidesOrder={setSlidesOrder}
          openSlide={openModal}
          deleteSlide={deleteSlide}
        />
        : ''}

      <Modal
        title={'Редактирование слайда'}
        open={modalOpen}
        closeModal={closeModal}
        content={
          modalOpen && <SlideView
            slide={slideToEdit}
            editSlide={editSlide}
            closeForm={closeModal}
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