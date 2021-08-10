import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddStudent = ({addStudent}) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({name, login, password});
  }

  return (
    <div>
      <div className={'add-student-form add-form'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className={'inputs-wrapper'}>
            <div className="form-group field">
              <input autoComplete='off' type="input" className="form-field" placeholder="ФИО" name="name" id='name'
                     onChange={e => setName(e.target.value)} required/>
              <label htmlFor="name" className="form-label">ФИО</label>
            </div>

            <div className="form-group field">
              <input autoComplete='off' type="input" className="form-field" placeholder="Логин" name="login" id='login'
                     onChange={e => setLogin(e.target.value)} required/>
              <label htmlFor="login" className="form-label">Логин</label>
            </div>

            <div className="form-group field">
              <input type="password" className="form-field" placeholder="Пароль" name="password" id='password'
                     onChange={e => setPassword(e.target.value)} required/>
              <label htmlFor="password" className="form-label">Пароль</label>
            </div>

            <div className='submit-btn-wrapper'>
              <button type="submit" className='btn' id='addStudent'>
                <span>Создать</span>
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired,
};

export default AddStudent;