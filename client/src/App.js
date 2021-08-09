import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import useUser from "./utils/useUser";

import Alert from "./components/ui/Alert";

import Login from "./components/login/Login";
import StudentsView from "./components/studentsView/StudentsView";
import TeachersView from "./components/teachersView/TeachersView";
import LessonsView from "./components/lessonsView/LessonsView";

import PrivateRoute from "./components/ui/PrivateRoute";
import {v4 as uuidv4} from 'uuid';
import api from "./utils/api";

const App = () => {
  const {user, setUser, unsetUser} = useUser()
  const [auth, setAuth] = useState({isAuthenticated: Boolean(user && user.token), isLoading: false});
  const [alerts, setAlerts] = useState([])

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const res = await api.post('/teachers/get-teachers');
      setTeachers(res.data.teachers);
    }
    getTeachers().catch((err)=> console.error(err))

  }, [user]);


  useEffect(() => {
    const getStudents = async () => {
      const res = await api.post('/students/get-students');
      setStudents(res.data.students);
    }
    getStudents().catch((err)=> console.error(err))

  }, [user]);

  useEffect(() => {
    const getLessons = async () => {
      const res = await api.post('/lessons/get-lessons');
      setLessons(res.data.students);
    }
    getLessons().catch((err)=> console.error(err))

  }, [user]);

  useEffect(() => {
    const getLevels = async () => {
      const res = await api.post('/levels/get-levels');
      setLevels(res.data.students);
    }
    getLevels().catch((err)=> console.error(err))

  }, [user]);


  const createTeacher = async (teacher) => {
    const newTeacher = await api.post('/teachers', {...teacher});
    setTeachers([...teachers, newTeacher])
  }

  const createStudent = async (student) => {
    const newStudent = await api.post('/students', {...student});
    setStudents([...students, newStudent])
  }

  const createLesson = async ({lessonTitle}) => {
    const newLesson = await api.post('/lessons', {name: lessonTitle});
    setLessons([...lessons, newLesson])
  }



  const deleteTeacher = async (teacher) => {
    await api.delete('/teachers', teacher._id);
    setTeachers(teachers.filter(i=>i._id !== teacher._id))
  }

  const deleteStudent = async (student) => {
    await api.delete('/students', student._id);
    setStudents(students.filter(i=>i._id !== student._id))
  }

  const deleteLesson = async (id) => {
    await api.delete('/lessons', {id});
    setLessons(lessons.filter(lesson => lesson._id !== id))
  }


  const editTeacher = () => {
    console.log('editTeacher')
  }

  const editLesson = async (newLesson) => {
    let createdLesson;
    try {
      createdLesson = await api.put('/lessons', newLesson);
    } catch (e) {
      e.response.data.errors.forEach(err => {
        setAlert(err.msg, 'danger')
      })
    }
    setLessons(lessons.map((lesson) => {
      if (lesson._id === newLesson._id) return createdLesson;
      else return lesson;
    }))
  }


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
                        component={LessonsView}
                        auth={auth}
                        user={user}
                        createLesson={createLesson}
                        deleteLesson={deleteLesson}
                        editLesson={editLesson}
                        lessons={lessons}
                        logout={logout}/>

          <PrivateRoute exact path="/teachers-view"
                        setAlert={setAlert}
                        component={TeachersView}
                        auth={auth}
                        user={user}
                        createTeacher={createTeacher}
                        deleteTeacher={deleteTeacher}
                        editTeacher={editTeacher}
                        teachers={teachers}
                        students={students}
                        logout={logout}/>

          <PrivateRoute exact path="/students-view"
                        setAlert={setAlert}
                        component={StudentsView}
                        auth={auth}
                        user={user}
                        createStudent={createStudent}
                        deleteStudent={deleteStudent}
                        students={students}
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