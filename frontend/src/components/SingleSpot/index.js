import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getSingularSpot } from '../../store/spots';

const singleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingularSpot(spotId));
  }, [dispatch, spotId]);

  if (!singleSpot) return "That ain't a spot!"
}

export default singleSpot;
