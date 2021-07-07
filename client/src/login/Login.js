import React, { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuth } from '../authSlice';
import api from '../api';

const Login = () => {
  const history = useHistory();
  const [unauthorized, setUnauthorized] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit() {
    api
      .login(username, password)
      .then((response) => {
        // response.data = jwt
        dispatch(changeAuth({ auth: true }));
        history.replace('/admin');
      })
      .catch((err) => {
        setInputs({
          username: '',
          password: '',
        });
        setUnauthorized(true);
        console.log('Unauthorized');
      });
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            label="Username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>
      {unauthorized ? <p>invalid username or password</p> : null}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
