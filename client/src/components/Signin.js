import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { showErrorMsg } from '../helpers/messages';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';
import { isAuthenticated, setAuthentication } from '../helpers/auth';

const Signin = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated() && isAuthenticated().role === 1) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate('/user/dashboard');
    }
  }, [navigate])


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false,
  });
  const { email, password, errorMsg, loading } = formData

  /***********************************
            EVENT HANDLERS
  ************************************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: ''
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData, errorMsg: 'All fields are required!'
      })
    } else if (!isEmail(email)) {
      setFormData({
        ...formData, errorMsg: 'Invalid email'
      })
    } else {
      const { email, password } = formData;
      const data = { email, password }

      setFormData({
        ...formData, loading: true
      });


      signin(data)
        .then(response => {
          setAuthentication(response.data.token, response.data.user);

          if(isAuthenticated() && isAuthenticated().role === 1) {
            console.log('Redirecting to admin dashboard');
            navigate('/admin/dashboard');
          } else {
            console.log('Redirecting to user dashboard');
            navigate('/user/dashboard');
          }
        })
        .catch(err => {
          console.log('signin api function error: ', err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage
          });
        });
 
    }

  }

  /***********************************
              VIEWS
  ************************************/

  const showSigninForm = () => (
    <form className='signup-form' onSubmit={handleSubmit} noValidate>
      {/* email */}
      <div className='form-group input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fa fa-envelope'></i>
          </span>
        </div>
        <input
          name='email'
          value={email}
          className='form-control'
          placeholder='Email address'
          type='email'
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className='form-group input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fa fa-lock'></i>
          </span>
        </div>
        <input
          name='password'
          value={password}
          className='form-control'
          placeholder='Create password'
          type='password'
          onChange={handleChange}
        />
      </div>
      {/* signin button */}
      <div className='form-group'>
        <button type='submit' className='btn btn-primary btn-block'>
          Signin
        </button>
      </div>
      {/* already have an account */}
      <p className='text-center text-white'>
        Don't have an account? <Link to='/signup'>Register</Link>
      </p>
    </form>
  )

  /***********************************
              RENDER VIEWS
  ************************************/
  return (
    <div className='signin-container'>
      <div className='mow vh-100'>
        <div className='col-md-5 mx-auto align-self-center'>
          {loading && <div className='text-center pb-4'>{showLoading()}</div>}
          {errorMsg && showErrorMsg(errorMsg)}
          {showSigninForm()}
        </div>
      </div>
    </div>
  )
}

export default Signin