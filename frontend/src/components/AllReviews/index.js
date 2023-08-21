import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getAllReviews, removeAReview } from '../../store/reviews';
import CreateAReviewForm from '../CreateAReviewForm';
import './AllReviews.css'

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

  console.log("HEY THIS IS THE ALLREVIEWS ", allReviews);

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
        <button id='deleteReview' onClick={() => {
          dispatch(removeAReview(reviewId))
        }}>
          Delete your review!
        </button>
      )
    }
  }

  return (
    <div className='allReviews'>
      <div>
        {allReviews.map(review => (
          <div className='reviewBox'>
            <div className='reviewerDetails'>
              <div className='reviewPicWrap'>
                <img id='reviewUserPic' src={review.User.avatar} />
              </div>
              <span id='reviewerName'>
                {review.User?.firstName} rates this SkyBnB <i id='spotStar' className="fa-sharp fa-solid fa-star"></i>{review.stars}!
              </span>
            </div>
            <div id='actualReview'>
              {review.review}
            </div>
            <div>
              {removeButton(review.userId, review.id)}
            </div>
          </div>
        ))}
      </div>

      <div className='outerReviewForm'>
        {createReviewForm}
      </div>
    </div>
  )

}


export default AllReviews;
