import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import AddLesson from "./addLesson/AddLesson";
import api from "../../utils/api";
import LessonsList from "./lessonsList/LessonsList";

const MainView = () => {
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
    console.log('delete')
    console.log(id)
    await api.delete('/lessons', {id});
    setLessons(lessons.filter(lesson => lesson._id !== id))
  }

  const openLesson = (id) => {
    history.push("/lesson/" + id);
  }

  const createLesson = async ({lessonTitle}) => {
    const newLesson = await api.post('/lessons', {name: lessonTitle});
    setLessons([...lessons, newLesson])
  }

  return (
    <div>
      <header style={{'margin': '20px'}}>
        Добро пожаловать, Админ
      </header>
      <button style={{'margin': '20px'}}
              onClick={() => setAddLessonVisible(!addLessonVisible)}>{addLessonVisible ? 'Закрыть' : 'Добавить урок'}</button>
      {addLessonVisible && <AddLesson createLesson={createLesson}/>}
      <LessonsList lessons={lessons} deleteLesson={deleteLesson} openLesson={openLesson}/>
    </div>
  )
}

// MainView.propTypes = {
//   user: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired,
//   setAlert: PropTypes.func.isRequired
// };

export default MainView;