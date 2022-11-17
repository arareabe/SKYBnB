import { csrfFetch } from "./csrf";

// TYPES
const READ_REVIEWS = 'reviews/readReviews';
const READ_USER_REVIEWS = 'reviews/readUserReviews';
const CREATE_REVIEW = 'reviews/createReview';
const REMOVE_REVIEW = 'reviews/removeReview';

// ACTION CREATORS

const readReviews = (allReviews) => {
  return {
    type: READ_REVIEWS,
    payload: allReviews
  }
}

const createReview = (newReview) => {
  return {
    type: CREATE_REVIEW,
    payload: newReview
  }
}

// MY THUNKS

export const getAllReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    const allReviews = await res.json();
    console.log("ALL REVIEWS ", allReviews)
    dispatch(readReviews(allReviews));
    return allReviews;
  }
}

export const createAReview = (spotId, newReview) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  });

  if (res.ok) {
    const createdReview = await res.json();
    dispatch(createReview(createdReview));
    return createdReview;
  }
}

// REDUCE ME!

const initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_REVIEWS:
      const reviewsState = { ...state, spot: {}, user: {} }
      action.payload.Reviews.forEach((review) => {
        reviewsState.spot[review.id] = review
      });
      return reviewsState;
    case CREATE_REVIEW:
      const createdReviewState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
      createdReviewState.spot[action.payload.id] = action.payload;
      return createdReviewState;
    default:
      return state;
  }
}

export default reviewsReducer;
