import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';
import { Modal } from '../../context/Modal';
import searchImg from '../../search.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navHeader'>
      <div>
        <NavLink exact to="/">
          <img id='skyBnb' src='https://i.imgur.com/yK6f0q5.jpg' />
        </NavLink>
      </div>
      <div className='navBarSearchWrapper'>
        <NavLink to={`/search/${search}`} >
          <img id='navBarSearch' src={searchImg} />
        </NavLink>
        <input
            id='search-bar'
            type='text'
            placeholder='Search Skybnb'
            value={search}
            onKeyUp={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='navModal'>
        <div className='hostLink'>
          <NavLink id='actualHostLink' to='/spots/create'>Become a Host!</NavLink>
        </div>
        <div>
        {isLoaded && (
            <ProfileButton
              user={sessionUser}
              setLogin={setLogin}
              setShowModal={setShowModal}
            />
          )}
        </div>
        {showModal && <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </Modal>}
      </div>
    </div>
  );
}

export default Navigation;
