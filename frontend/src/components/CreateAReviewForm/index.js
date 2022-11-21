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
            <span id='reviewStarsTop'>Rate those stars!</span>
            {/* <input
              type='number'
              placeholder='stars out of 5'
              value={stars}
              onChange={e => setStars(e.target.value)}
            /> */}
            <fieldset className='reviewStars' value={stars} onChange={e => setStars(e.target.value)}>
                <input className="reviewStar" type="radio" id="rating10" name="rating" value="1" /><label className='actualStar' title="5 stars"></label>
                <input className="reviewStar" type="radio" id="rating8" name="rating" value="2" /><label className='actualStar' title="5 stars"></label>
                <input className="reviewStar" type="radio" id="rating6" name="rating" value="3" /><label className='actualStar' title="5 stars"></label>
                <input className="reviewStar" type="radio" id="rating4" name="rating" value="4" /><label className='actualStar' title="5 stars"></label>
                <input className="reviewStar" type="radio" id="rating2" name="rating" value="5" /><label className='actualStar' title="5 stars"></label>
            </fieldset>
          </div>
        </div>

        {hasSubmitted && validationErrors.length > 0 && (
          <div>
            To submit a review, please handle the following errors:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
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
