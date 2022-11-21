import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './CreateAReviewForm.css'

import { createAReview } from '../../store/reviews';

const CreateAReviewForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("")
  const [stars, setStars] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (!review.length) errors.push('Review cannot be empty')
    if (!stars) errors.push('Select a rating between 1 through 5!')
    if (stars < 0 || stars > 5) errors.push('Select a rating between 1 through 5!')

    setValidationErrors(errors)
  }, [review, stars]);

  const submitHandler = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    const reviewInfo = {
      review,
      stars
    };

    if (!validationErrors.length) {
      let createdReview = await dispatch(createAReview(spotId, reviewInfo));

      if (createdReview) history.push(`/spots/${spotId}`);

      setReview('');
      setStars(0);
      setValidationErrors([]);
      setHasSubmitted(false);
    }
  }

  return (
    <div className='createReviewBox'>
      <div id='reviewTop'>
        <h2>Review your SkyBnB!</h2>
      </div>
      <form className='reviewForm' onSubmit={submitHandler}>
        <div>
          <div className='reviewTextBox'>
            <textarea
              id='reviewTextarea'
              placeholder='review'
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </div>
          <div>
            <span id='reviewStarsTop'>Rate your SkyBnB!</span>
            {/* <input
              type='number'
              placeholder='stars out of 5'
              value={stars}
              onChange={e => setStars(e.target.value)}
            /> */}
            <fieldset className='reviewStars' value={stars} onChange={e => setStars(e.target.value)}>
                <input className="reviewStar" type="radio" value="1" />
                <input className="reviewStar" type="radio" value="2" />
                <input className="reviewStar" type="radio" value="3" />
                <input className="reviewStar" type="radio" value="4" />
                <input className="reviewStar" type="radio" value="5" />
            </fieldset>
          </div>
        </div>

        {hasSubmitted && validationErrors.length > 0 && (
          <div id='reviewFormTitle'>
            To submit a review, please handle the following errors:
            <div>
              {validationErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          </div>
        )}

        <div className='reviewsButton'>
          <button id='submitButton' type='submit'>Submit your SkyBnB review!</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAReviewForm;
