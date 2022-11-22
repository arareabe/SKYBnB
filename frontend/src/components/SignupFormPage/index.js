import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(() => {
          setShowModal(false)
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signupFormModal'>
      <form className='signupForm' onSubmit={handleSubmit}>
        <h3 id='signupTitle'>Welcome to SkyBnB</h3>
        <div className="validErrs">
          {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
        <input
          type="text"
          id='firstnameField'
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          id='lastnameField'
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          id='emailField'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          id='userNameField'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id='passWordField'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id='confirmpassWordField'
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button id='signupButton' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
