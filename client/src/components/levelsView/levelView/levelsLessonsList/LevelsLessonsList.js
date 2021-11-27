import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import api from "../../../../utils/api";
import LevelsLessonItem from "./levelsLessonItem/LevelsLessonItem";
import LessonsSelector from "../LessonsSelector/LessonsSelector";


const LevelsLessonsList = ({lessons = [], setLessons}) => {
  const [allLessons, setAllLessons] = useState([]);
  useEffect(() => {
    const getLessons = async () => {
      let res;
      if (allLessons.length === 0){
        res = await api.post('/lessons/get-lessons', {namesOnly: true})
        res = res.data.lessons
      }  else {
        res = allLessons;
      }
      const lessonsIds = lessons.map(lesson => lesson._id)
      const newLessons = res.filter(lesson => !lessonsIds.includes(lesson._id))
      setAllLessons(newLessons);
    }
    getLessons().catch((err) => console.error(err))

  }, [lessons]);

  const setSelectedLessons = (lesson) => {
    setLessons([...lessons, lesson])
  }

  const deleteLesson = (id) => {
    setLessons(lessons.filter(lesson => lesson._id !== id));
  }


  return (
    <div className={'levels-lessons-wrapper inline-list'}>
      <div className={'list-wrapper'}>
        <div className={'group-title'}>Уроки:</div>
        {
          lessons.map(lesson => <LevelsLessonItem key={lesson._id} lesson={lesson}
                                                  deleteLesson={() => deleteLesson(lesson._id)}/>)
        }
      </div>
      <LessonsSelector lessons={allLessons} setSelectedLesson={setSelectedLessons}/>
    </div>
  )
}

LevelsLessonsList.propTypes = {
  lessons: PropTypes.array.isRequired,
};

export default LevelsLessonsList;