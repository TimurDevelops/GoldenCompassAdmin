import React from 'react';
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import {FaSignOutAlt} from 'react-icons/fa';

import './Header.scss'

const Header = ({logout}) => {
  return (
    <header className='header'>
      <div className={'menu'}>
        <MenuItem link={'/teachers-view'} label={'Учителя'}/>
        <MenuItem link={'/students-view'} label={'Ученики'}/>
        <MenuItem link={'/categories-view'} label={'Категории'}/>
        <MenuItem link={'/lessons-view'} label={'Уроки'}/>
        <MenuItem link={'/levels-view'} label={'Уровни'}/>
      </div>


      <div className={'logout'}>
        <button id='logoutBtn' onClick={logout}>
          <FaSignOutAlt/>
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Header;