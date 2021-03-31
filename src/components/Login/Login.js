import React, { useContext, useState } from 'react';
import './Login.css';
import GoogleIcon from '../../images/icons/Group 573.png'
import { handleGoogleSignIn, initializeFirebase } from './LoginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

initializeFirebase();

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  return (
    <div className='login d-flex justify-content-center mt-5'>
      <div className='text-center mt-5 card p-5'>
        <button className='btn btn-block btn-customise d-flex justify-content-center align-items-center' onClick={googleSignIn}> <img src={GoogleIcon} alt="" /> Continue with Google </button>
      </div>
    </div>
  );
};

export default Login;