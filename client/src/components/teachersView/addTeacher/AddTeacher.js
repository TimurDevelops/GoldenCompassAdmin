import React, {useState} from 'react';
import PropTypes from "prop-types";

const AddTeacher = ({addTeacher}) => {
  const [login, setLogin] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher({name, login, password, isAdmin});
  }

  return (
    <div>
      <div className={'add-teacher-form add-form'}>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className={'inputs-wrapper'}>

            <div className="form-group field abacus">
              <label htmlFor="isAdmin">Привелегии администратора: </label>
              <input type="checkbox" placeholder="Абакус" name="isAdmin" id='isAdmin'
                     onChange={e => setIsAdmin(e.target.checked)}/>
            </div>

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
              <input autoComplete='off' type="password" className="form-field" placeholder="Пароль" name="password" id='password'
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

AddTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
};

export default AddTeacher;