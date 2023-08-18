import { useEffect } from "react";
import { useDispatch } from "react-redux";
import home100 from '../../pics/home100.png'
import { NavLink } from "react-router-dom"
import './ClassBar.css'

const ClassBar = () => {
  const dispatch = useDispatch();

  return (
    <div className='classBarWrapper'>
      <NavLink to='/'>
        <img src={home100} />
        <div>Class Category Ex.</div>
      </NavLink>
      <NavLink to='/'>
        <img src={home100} />
        <div>Class Category Ex.</div>
      </NavLink>
      <NavLink to='/'>
        <img src={home100} />
        <div>Class Category Ex.</div>
      </NavLink>
    </div>
  )

}

export default ClassBar;
