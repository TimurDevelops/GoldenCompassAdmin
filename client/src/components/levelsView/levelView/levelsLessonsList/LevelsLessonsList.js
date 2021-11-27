import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import api from "../../../../utils/api";
import LevelsLessonItem from "./levelsLessonItem/LevelsLessonItem";
import LessonsSelector from "../LessonsSelector/LessonsSelector";


const LevelsLessonsList = ({lessons = [], setLessons}) => {
  const [allLessons, setAllLessons] = useState([]);
  const [lessonsIds, setLessonsIds] = useState([]);

  useEffect(() => {
    const getLessons = async () => {
      // const newLessons = res.filter(lesson => !lessonsIds.includes(lesson._id))
      const res = await api.post('/lessons/get-lessons', {namesOnly: true})

      setAllLessons(res.data.lessons);
    }
    getLessons().catch((err) => console.error(err))

  }, []);

  useEffect(() => {
    setLessonsIds(lessons.map(lesson => lesson._id))
  }, [lessons])

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
          lessons.map(lesson => <LevelsLessonItem key={lesson._id}
                                                  lesson={lesson}
                                                  deleteLesson={() => deleteLesson(lesson._id)}/>)
        }
      </div>
      <LessonsSelector lessons={allLessons.filter(lesson => !lessonsIds.includes(lesson._id))}
                       setSelectedLesson={setSelectedLessons}/>
    </div>
  )
}

LevelsLessonsList.propTypes = {
  lessons: PropTypes.array.isRequired,
};

export default LevelsLessonsList;