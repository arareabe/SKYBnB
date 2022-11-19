import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getAllReviews, removeAReview } from '../../store/reviews';
import CreateAReviewForm from '../CreateAReviewForm';

const AllReviews = ({ spotId }) => {
  const dispatch = useDispatch();

  const currUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId])

  const reviewsObj = useSelector((state => state.reviews.spot));
  const allReviews = Object.values(reviewsObj);

  // useEffect(() => {
  //   console.log("THE SPOTID ", spotId)

  // }, [])

  // console.log("HEY THIS IS THE ALLREVIEWS ", reviewsObj);

  let alreadyReviewed
  if (currUser) {
    alreadyReviewed = allReviews.find(review => currUser.id === review.userId)
  }

  const currSpot = useSelector(state => state.spots.singleSpot);

  let createReviewForm
  if (currUser && !alreadyReviewed && currSpot.ownerId !== currUser.id) {
    createReviewForm = (
      <div>
        <CreateAReviewForm spotId={currSpot.id} />
      </div>
    )
  }

  const removeButton = (userId, reviewId) => {
    if (currUser?.id !== userId) {
      return null
    } else {
      return (
        <button onClick={() => {
          dispatch(removeAReview(reviewId))
        }}>
          Delete your review!
        </button>
      )
    }
  }

  return (
    <div>
      <div>
        {currSpot.avgRating} · {currSpot.numReviews} {currSpot.numReviews === 1 ? 'review' : 'reviews'}
      </div>

      <div>
        {allReviews.map(review => (
          <div>
            <div>
              {review.User?.firstName} rates this SkyBnB {review.stars}!
              {/* {console.log("HEY THIS IS REVIEW BUDDY ", review)} */}
            </div>
            <div>
              {review.review}
            </div>
            <div>
              {removeButton(review.userId, review.id)}
            </div>
          </div>
        ))}
      </div>

      <div>
        {createReviewForm}
      </div>
    </div>
  )

}


export default AllReviews;
