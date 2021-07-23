import React from 'react';
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

import './Modal.scss';

const Modal = ({title = 'Модальное окно', open, closeModal, content}) => {

  const close = () => {
    if(content.closeModal && content.closeModal()){
      closeModal()
    }
  }

  return (
    <div className={`modal-bg ${open ? 'open' : ''}`}>
      <div className={'modal-wrapper'}>
        <div className={'header'}>
          <div className={'title'}>{title}</div>

          <div className={'close-btn-wrapper'}>
            <div className={'close-btn'} onClick={close}><FaTimes/></div>
          </div>
        </div>

        {content}
      </div>
    </div>
  )

}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.node
};

export default Modal;