import React from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

const TeachersView = ({logout}) => {

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>

    </div>
  )
}

TeachersView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default TeachersView;