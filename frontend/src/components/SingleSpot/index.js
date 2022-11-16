import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getSingularSpot } from '../../store/spots';

const SingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingularSpot(spotId));
  }, [dispatch, spotId]);


  const theSpot = useSelector(state => state.spots.singleSpot)

  useEffect(() => {
    console.log(theSpot)
  }, [])

  if (!theSpot) return "That ain't a spot!"

  return (
    <div>
      <div>
        <h1>{theSpot.name}</h1>
      </div>
      <div>
        <span>
          {theSpot.avgRating} · {theSpot.numReviews} reviews · {theSpot.city}, {theSpot.state}, {theSpot.country}
        </span>
      </div>
      <div>
        <img src={theSpot.SpotImages ? theSpot.SpotImages[0].url : null} />
      </div>
      <div>
        
      </div>
    </div>

  )
}

export default SingleSpot;
