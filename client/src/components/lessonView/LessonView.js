import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

import {FaEdit, FaTimes, FaCheck} from "react-icons/fa";
import AddLesson from "../mainView/addLesson/AddLesson";

import './LessonsView.scss';

const LessonsView = ({slides, lessonTitle}) => {
  const history = useHistory();
  const [newLessonTitle, setNewLessonTitle] = useState(lessonTitle);
  const [newSlides, setNewSlides] = useState(slides);
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingSlide, setAddingSlide] = useState(false);
  let savedTitle = lessonTitle;

  const goBack = () => {
    if (slides !== newSlides && lessonTitle !== newLessonTitle && confirm('Выйти не сохранив изменения?')) {
      history.push("/main-view");
    } else {
      history.push("/main-view");
    }
  }

  return (
    <div>
      <header className={'lesson-view-header'}>
        <div className={"menu-item underline"} onClick={() => goBack()}>
          <a>Вернуться</a>
        </div>
      </header>

      <section className={'form-wrapper'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>

          <div className={'inputs-wrapper'}>

            <div className={'title-wrapper'}>
              {editingTitle
                ?
                <div>
                  <div className={'icon-btn'}
                       onClick={() => {
                         setEditingTitle(false)
                         setNewLessonTitle(savedTitle)
                       }}>
                    <FaTimes/>
                  </div>
                  <div className={'edit-btn'} onClick={() => setEditingTitle(false)}>
                    <FaEdit/>
                  </div>
                </div>
                :
                <div className={'icon-btn'} onClick={() => {
                  setEditingTitle(true)
                  savedTitle = newLessonTitle
                }}>
                  <FaEdit/>
                </div>
              }

              {editingTitle && <div className="form-group field">
                <input type="input" className="form-field" placeholder="Название урока" name="login" id='login'
                       value={newLessonTitle}
                       onChange={e => setNewLessonTitle(e.target.value)} required/>
                <label htmlFor="login" className="form-label">Логин</label>
              </div>}
            </div>

            <div className={'slides-wrapper'}>

              <button style={{'margin': '20px'}}
                      onClick={() => setAddingSlide(!addingSlide)}>{addingSlide ? 'Закрыть' : 'Добавить слайд'}</button>
              {addingSlide && <AddLesson createLesson={createLesson}/>}


              <SlidesList slides={newSlides} deleteSlide={deleteSlide} openSlide={openSlide}/>
            {/*  TODO Переместить view в модальное окно */}
            {/*  TODO Переместить editSlide в модальное окно */}
            {/*  TODO Сделать slideItems draggable */}
            {/*  TODO Создать отдельный компонент для title */}


            </div>

          </div>
        </form>

      </section>


    </div>
  )
}

LessonsView.propTypes = {
  slides: PropTypes.array.isRequired,
  lessonTitle: PropTypes.string.isRequired,
};

export default LessonsView;