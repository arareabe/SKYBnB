import { useEffect } from "react";
import { useDispatch } from "react-redux";
import home100 from '../../pics/home100.png'
import beach64 from '../../pics/beach100.png'
import cabin64 from '../../pics/cabin100.png'
import castle100 from '../../pics/castle100.png'
import farm100 from '../../pics/farm100.png'
import lake100 from '../../pics/lake100.png'
import mansion64 from '../../pics/mansion100.png'
import room100 from '../../pics/room100.png'
import desert from '../../pics/desert.png'
import boat from '../../pics/boat.png'
import dome from '../../pics/dome.png'
import { NavLink } from "react-router-dom"
import './ClassBar.css'

const ClassBar = () => {
  const dispatch = useDispatch();

  return (
    <div className='classBarWrapper'>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={room100} />
        <div>Rooms</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={beach64} />
        <div>Beachfront</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={home100} />
        <div>Homes</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={cabin64} />
        <div>Cabins</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={lake100} />
        <div>Lakefront</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={mansion64} />
        <div>Mansions</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={farm100} />
        <div>Farms</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={castle100} />
        <div>Castles</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={desert} />
        <div>Desert</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={boat} />
        <div>Boats</div>
      </NavLink>
      <NavLink className='classBarNav' to='/'>
        <img className='classBarImg' src={dome} />
        <div>Domes</div>
      </NavLink>
    </div>
  )

}

export default ClassBar;
