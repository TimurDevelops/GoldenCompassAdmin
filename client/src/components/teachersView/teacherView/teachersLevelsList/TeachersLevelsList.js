import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import api from "../../../../utils/api";
import TeachersLevelItem from "./teachersLevelItem/TeachersLevelItem";
import LevelsSelector from "../levelsSelector/LevelsSelector";


const TeachersLevelsList = ({levels, setLevels}) => {
  const [allLevels, setAllLevels] = useState([]);

  useEffect(() => {
    const getLevels = async () => {
      const res = await api.post('/levels/get-levels');
      const levelsIds = levels.map(level => level._id)
      const newLevels = res.data.levels.filter(level => !levelsIds.includes(level._id))
      setAllLevels(newLevels);
    }
    getLevels().catch((err) => console.error(err))

  }, [levels]);

  const setSelectedLevel = (level) => {
    setLevels([...levels, level])
  }

  const deleteStudent = (id) => {
    setLevels(levels.filter(level => level._id !== id));
  }


  return (
    <div className={'teachers-levels-wrapper inline-list'}>
      <div className={'list-wrapper'}>
        <div className={'group-title'}>Уровни:</div>
        {
          levels.map(level => <TeachersLevelItem key={level._id} level={level}
                                                     deleteLevel={() => deleteStudent(level._id)}/>)
        }
      </div>
      <LevelsSelector levels={allLevels} setSelectedLevel={setSelectedLevel}/>
    </div>
  )
}

TeachersLevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
  setLevels: PropTypes.array.isRequired,
};

export default TeachersLevelsList;