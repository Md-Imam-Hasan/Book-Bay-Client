import React, { useContext, useState } from 'react';
import './Login.css';
import GoogleIcon from '../../images/Group 573.png'
import { handleGoogleSignIn, handleNewUserWithEmailAndPassword, handleSignInWithEmailAndPassword, initializeFirebase } from './LoginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import useForm from '../ValidateInfo/useForm';
import validateInfo from '../ValidateInfo/ValidateInfo';

initializeFirebase();

const Login = () => {
  const [newUser, setNewUser] = useState(false);

  function submitForm() {
    const { name, email, password1 } = values;
    if (newUser) {
      handleNewUserWithEmailAndPassword(name, email, password1)
        .then(res => {
          handleResponse(res, true);
        })
    }
    if (!newUser) {
      handleSignInWithEmailAndPassword(email, password1)
        .then(res => {
          res.success ? handleResponse(res, true) : handleResponse(res, false);
        })
    }
  }
  const [user, setUser] = useState({
    name: '',
    email: '',
    success: false
  });
  let { handleChange, handleSubmit, values, errors } = useForm(submitForm, validateInfo);
  const [userName, setUserName] = useContext(UserContext);
  values.isNewUser = newUser;

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, isRedirect) => {
    setUser(res);
    setUserName(res.name);
    isRedirect && history.replace(from);
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  return (
    <div className='login d-flex flex-column justify-content-center align-items-center'>
      <div className="card mt-4">
        {newUser ? <h1 className='m-3'>Create an account</h1> : <h1 className='m-3'>Login</h1>}
        <div className='container login-form'>
          <form onSubmit={handleSubmit}>
            {newUser && <div className='form-inputs'>
              <input
                type="text"
                name='name'
                placeholder='Name'
                value={values.name}
                onChange={handleChange} />
              {errors.name && <p>{errors.name}</p>}
            </div>}
            <div className="form-inputs">
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={values.email}
                onChange={handleChange} />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-inputs">
              <input
                type="password"
                name="password1" placeholder='Password'
                value={values.password1}
                onChange={handleChange} />
              {errors.password1 && <p>{errors.password1}</p>}
            </div>
            {newUser && <div className="form-inputs">
              <input
                type="password"
                name="password2" placeholder='Confirm Password' value={values.password2}
                onChange={handleChange} />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>}
            {!newUser && <div className='px-4 d-flex justify-content-between'>
              <div>
                <input className='mr-1' type="checkbox" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div>
                <span>Forget Password</span>
              </div>
            </div>}
            <input className='mt-1 btn btn-submit btn-lg btn-danger' type="submit" value={newUser ? 'Create an account' : 'Login'} />
          </form>
          <div className='text-center'>
            {newUser ? <p>Already have an account? <span onClick={() => setNewUser(!newUser)}>Login</span></p> : <p>Don't have an account? <span onClick={() => setNewUser(!newUser)}>Create an account</span></p>}
          </div>
          <div className="text-center">
            {!user.success && <p style={{ color: 'red' }}>{user.error}</p>}
          </div>
        </div>
      </div>
      <div className='text-center'>
        <big className='p-3 bg-white d-inline-block'>Or</big>
        <button className='btn btn-block btn-customise d-flex justify-content-center align-items-center' onClick={googleSignIn}> <img src={GoogleIcon} alt="" /> Continue with Google </button>
      </div>
    </div>
  );
};

export default Login;