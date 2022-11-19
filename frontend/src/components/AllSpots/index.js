import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllSpots } from '../../store/spots';

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => Object.values(state.spots.allSpots));

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]);

  useEffect(() => {
    console.log(allSpots);
  })

  if (!allSpots) return 'Loading all available spots!...'

  return (
    <div>
      <h1>Welcome to SkyBnB!</h1>
      <div>
        {allSpots.map(spot =>
          <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage}></img>
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>
              {spot.avgRating}
            </div>
            <div>
              {spot.price}
              <span>{' '}night</span>
            </div>
          </Link>
          )}
      </div>
    </div>
  )
}

export default AllSpots;
