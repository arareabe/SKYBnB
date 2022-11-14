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

  return (
    <h1>{theSpot.name}</h1>
  )



  if (!theSpot) return "That ain't a spot!"
}

export default SingleSpot;
