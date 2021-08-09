import React from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

const StudentsView = ({logout}) => {

  return (
    <div>
      <Header logout={logout} style={{'margin': '20px'}}/>

    </div>
  )
}

StudentsView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default StudentsView;