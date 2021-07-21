import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

import AddLesson from "./addLesson/AddLesson";
import LessonsList from "./lessonsList/LessonsList";
import Header from "../ui/Header";

import api from "../../utils/api";

const MainView = ({logout}) => {
  const history = useHistory();
  const [lessons, setLessons] = useState([]);
  const [addLessonVisible, setAddLessonVisible] = useState(false);
  useEffect(() => {
    const getLessons = async () => {
      const res = await api.get('/lessons/get-lessons');
      setLessons(res.data.lessons);
    }
    getLessons().catch((err) => console.error(err))
  }, []);

  const deleteLesson = async (id) => {
    await api.delete('/lessons', {id});
    setLessons(lessons.filter(lesson => lesson._id !== id))
  }

  const openLesson = (id) => {
    history.push("/lessonView/" + id);
  }

  const createLesson = async ({lessonTitle}) => {
    const newLesson = await api.post('/lessons', {name: lessonTitle});
    setLessons([...lessons, newLesson])
  }

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>
      <button style={{'margin': '20px'}}
              onClick={() => setAddLessonVisible(!addLessonVisible)}>{addLessonVisible ? 'Закрыть' : 'Добавить урок'}</button>
      {addLessonVisible && <AddLesson createLesson={createLesson}/>}
      <LessonsList lessons={lessons} deleteLesson={deleteLesson} openLesson={openLesson}/>
    </div>
  )
}

MainView.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default MainView;