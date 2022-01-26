import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import Header from "../ui/Header";

const CategoriesView = ({logout, setAlert, categories}) => {

  return (
    <div>
      <Header logout={logout}/>

    </div>
  )
}

CategoriesView.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default CategoriesView;