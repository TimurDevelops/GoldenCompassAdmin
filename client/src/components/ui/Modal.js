import React from 'react';
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";

import './Modal.scss';

const Modal = ({title = 'Модальное окно', open, closeModal, content}) => {

  const close = () => {
    if (window.confirm('Закрыть не сохранив изменения?')) {
      closeModal()
    }
  }

  const clickOutside = (e) => {
    if(e.target.classList.contains('modal-wrapper')) close()
  }

  return (
    <div className={`wrapper ${open ? 'open' : 'close'}`}>
      <div className={`modal-bg`}/>
      <div className={'modal-wrapper'} onClick={clickOutside}>
        <div className={'modal'}>
          <div className={'header'}>
            <div className={'title'}>{title}</div>

            <div className={'close-btn-wrapper'}>
              <div className={'close-btn'} onClick={close}><FaTimes/></div>
            </div>
          </div>
          <div className={'content'}>
            {content}
          </div>
        </div>
      </div>
    </div>
  )

}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.node,
};

export default Modal;