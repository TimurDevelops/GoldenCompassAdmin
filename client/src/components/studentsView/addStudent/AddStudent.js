import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddStudent = ({addStudent}) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    addStudent({login, password})
  }

  return (
    <div>
      <div className={'add-student-form'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className={'inputs-wrapper'}>
            <div className="form-group field">
              <input type="input" className="form-field" placeholder="Название урока" name="login" id='login'
                     onChange={e => setLogin(e.target.value)} required/>
              <label htmlFor="login" className="form-label">Логин</label>
            </div>

            <div className="form-group field">
              <input type="input" className="form-field" placeholder="Название урока" name="password" id='password'
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