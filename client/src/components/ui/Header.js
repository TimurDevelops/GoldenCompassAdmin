import React from 'react';
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

import './Header.scss'

const Header = ({logout}) => {
  return (
    <header className='header'>
      <MenuItem link={'/teachers-view'} label={'Учителя'}/>
      <MenuItem link={'/students-view'} label={'Ученики'}/>
      <MenuItem link={'/lessons-view'} label={'Уроки'}/>
      <MenuItem link={'/levels-view'} label={'Уровни'}/>

      <button id='logoutBtn' onClick={logout}>Выйти</button>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Header;