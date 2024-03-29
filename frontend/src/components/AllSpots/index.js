import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './AllSpots.css';

import { getAllSpots } from '../../store/spots';
import Classbar from '../ClassBar';

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => Object.values(state.spots.allSpots));

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]);

  if (!allSpots) return 'Loading all available spots!...'

  return (
    <div className='allSpotsWrap'>
      <Classbar />
      <div className='spotWrapper'>
        <div className='spotCards'>
          {allSpots.map(spot =>
            <div key={spot.id} className='spotCard'>
              <NavLink className='spotLink'  to={`/spots/${spot.id}`}>
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

export default AllSpots;
