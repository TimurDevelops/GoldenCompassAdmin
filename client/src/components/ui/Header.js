import React from 'react';
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

import './Header.scss'

const Header = ({logout}) => {

  return (
    <header className='header'>
      <MenuItem link={'/lessons-view'} label={'Управление уроками'}/>
      <MenuItem link={'/teachers-view'} label={'Управление учителями'}/>
      <MenuItem link={'/students-view'} label={'Управление учениками'}/>

      <button id='logoutBtn' onClick={logout}>Выйти</button>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Header;