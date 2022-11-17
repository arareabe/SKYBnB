import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';

const AllReviews = () => {
  const { spotId } = useParams();

  return (
    <div>
      <h2>This is a review</h2>
    </div>
  )

}


export default AllReviews;
