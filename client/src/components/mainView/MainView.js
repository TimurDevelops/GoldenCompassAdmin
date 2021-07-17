import React from 'react';

import AddLesson from "./addLesson/AddLesson";

const MainView = () => {

  const createLesson = (lesson) => {
    console.log(lesson);
  }

  return (
    <div>
      Добро пожаловать, Админ
      <AddLesson createLesson={createLesson}/>

    </div>
  )
}

// MainView.propTypes = {
//   user: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired,
//   setAlert: PropTypes.func.isRequired
// };

export default MainView;