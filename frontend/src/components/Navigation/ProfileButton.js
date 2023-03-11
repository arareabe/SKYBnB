import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='userButton' onClick={openMenu}>
        <i className="fa-solid fa-user" />
      </button>
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <NavLink to='/user' id='profile-button-name'>{user.username}</NavLink>
          <div>{user.email}</div>
          <div>
            <button className='profileButtons' onClick={logout}>Log Out</button>
          </div>
        </ul>) :
        (<ul className="profile-dropdown">
          <div>
            <button className='profileButtons' onClick={() => {
              setLogin(true)
              setShowModal(true)
            }}>Log In</button>
          </div>
          <div>
            <button className='profileButtons' onClick={() => {
              setLogin(false)
              setShowModal(true)
            }}>Sign Up</button>
          </div>
        </ul>)
      )}
    </>
  );
}

export default ProfileButton;
