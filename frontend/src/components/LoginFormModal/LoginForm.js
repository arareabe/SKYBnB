import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        setShowModal(false)
      })
      .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='loginFormModal'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <h3 id='loginTitle'>Welcome to SkyBnB</h3>
        <div className='validErrs'>
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <input
          type="text"
          id='usernameField'
          placeholder='Username or Email'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          id='passwordField'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button id='loginButton' type="submit">Log In</button>
        <button id='loginButton' type='submit' onClick={() => {
          setCredential('Demo-lition')
          setPassword('password')
        }}>Demo Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
