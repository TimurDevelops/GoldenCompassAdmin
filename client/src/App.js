import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import useUser from "./utils/useUser";

import Alert from "./components/ui/Alert";

import Login from "./components/login/Login";
import StudentsView from "./components/studentsView/StudentsView";
import TeachersView from "./components/teachersView/TeachersView";
import MainView from "./components/mainView/MainView";

import PrivateRoute from "./components/ui/PrivateRoute";
import {v4 as uuidv4} from 'uuid';

const App = () => {
  const {user, setUser, unsetUser} = useUser()
  const [auth, setAuth] = useState({isAuthenticated: Boolean(user && user.token), isLoading: false});
  const [alerts, setAlerts] = useState([])

  const setAlert = (msg, alertType, timeout = 5000) => {
    const id = uuidv4();
    setAlerts([...alerts, {msg, alertType, id}])

    setTimeout(() => removeAlert(id), timeout);
  };

  function removeAlert(id) {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  }

  const logout = () => {
    unsetUser();
    setAuth({isAuthenticated: false, isLoading: false});
  };

  return (
    <section className="container">
      <Alert alerts={alerts}/>
      <Router>
        <Switch>
          {/* Sign In Page */}
          <Route exact path="/login"
                 render={(props) =>
                   <Login {...props} setAuth={setAuth} setAlert={setAlert} setUser={setUser} auth={auth}/>
                 }/>

          <PrivateRoute exact path="/lessons-view"
                        setAlert={setAlert}
                        component={MainView}
                        auth={auth}
                        user={user}
                        logout={logout}/>

          <PrivateRoute exact path="/teachers-view"
                        setAlert={setAlert}
                        component={TeachersView}
                        auth={auth}
                        user={user}
                        logout={logout}/>

          <PrivateRoute exact path="/students-view"
                        setAlert={setAlert}
                        component={StudentsView}
                        auth={auth}
                        user={user}
                        logout={logout}/>

          {/* 404 Page */}
          <Route path="*" render={
            () => {
              if (auth.isAuthenticated) {
                return <Redirect to="/lessons-view"/>
              } else {
                return <Redirect to="/login"/>
              }
            }
          }/>
        </Switch>
      </Router>
    </section>
  );
};

export default App;