import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllClasses } from "../../store/classes";

const ClassBar = () => {
  const dispatch = useDispatch();

  const allClasses = useSelector((state) => Object.values(state.classes.allClasses))

  useEffect(() => {
    dispatch(getAllClasses())
  }, [dispatch])

  return (
    <div className='classBarWrapper'>
      {allClasses.map(clas => {
        return <NavLink to={`/classes/${clas.class}`} className='classBarNav' key={clas.id}>
          <img className='classBarImg' src={clas.pic} />
          <div>{clas.class}</div>
        </NavLink>
      })}
    </div>
  )

}

export default ClassBar;
