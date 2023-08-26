import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllClaspot } from '../../store/classes';
import Classbar from '../ClassBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../AllSpots/AllSpots.css'

const Claspot = (props) => {
  const dispatch = useDispatch();
  const { classId } = useParams();

  const allClaspot = useSelector(state => Object.values(state.classes.allClaspot));

  useEffect(() => {
    dispatch(getAllClaspot(classId))
  }, [dispatch, classId]);

  useEffect(() => {
    // console.log("WOOT THIS IS NEW", classId);
    // console.log("DAAAAAMn", allClaspot)
  })

  if (!allClaspot) return 'Loading all available spots!...'

  return (
    <div className='allSpotsWrap'>
      <Classbar />
      <div className='spotWrapper'>
        <div className='spotCards'>
          {allClaspot.map(spot =>
            <div className='spotCard'>
              <NavLink className='spotLink' to={`/spots/${spot.id}`}>
                <div className='imageDiv'>
                  <img src={spot.previewImage} className='image'></img>
                </div>

                <div className='cardInfo'>
                  <div className='cardTopInfo'>
                    <div>
                      {spot.city}, {spot.state}
                    </div>
                    <div id='spotStarWrapper'>
                      <i id='spotStar' className="fa-sharp fa-solid fa-star"></i>
                      {spot.avgRating}
                    </div>
                  </div>

                  <div id='spotName'>
                    {spot.name}
                  </div>

                  <div className='spotPrice'>
                    <span id='actualPrice'>${spot.price}</span>
                    <span>{' '}night</span>
                  </div>
                </div>

              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Claspot;
