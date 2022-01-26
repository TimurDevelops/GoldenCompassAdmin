import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import api from "../../../../utils/api";
import CategoriesTeacherItem from "./categoriesTeacherItem/CategoriesTeacherItem";
import TeachersSelector from "../teachersSelector/TeachersSelector";

const CategoriesTeachersList = ({teachers = [], setTeachers}) => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [teachersIds, setTeachersIds] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const res = await api.post('/teachers/get-teachers')

      setAllTeachers(res.data.teachers);
    }
    getTeachers().catch((err) => console.error(err))

  }, [teachersIds]);

  useEffect(() => {
    setTeachersIds(teachers.map(lesson => lesson._id))
  }, [teachers])

  const setSelectedTeachers = (lesson) => {
    setTeachers([...teachers, lesson])
  }

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher._id !== id));
  }

  return (
    <div className={'categories-teachers-wrapper inline-list'}>
      <div className={'list-wrapper'}>
        <div className={'group-title'}>Учителя:</div>
        {
          teachers.map(teacher => <CategoriesTeacherItem key={teacher._id}
                                                         teacher={teacher}
                                                         deleteTeacher={() => deleteTeacher(teacher._id)}/>)
        }
      </div>
      <TeachersSelector teachers={allTeachers.filter(lesson => !teachersIds.includes(lesson._id))}
                        setSelectedTeacher={setSelectedTeachers}/>
    </div>
  )
}

CategoriesTeachersList.propTypes = {
  teachers: PropTypes.array.isRequired,
  setTeachers: PropTypes.func.isRequired,
};

export default CategoriesTeachersList;