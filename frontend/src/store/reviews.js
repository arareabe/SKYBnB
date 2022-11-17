import { csrfFetch } from "./csrf";

// TYPES
const READ_REVIEWS = 'reviews/readReviews';
const READ_USER_REVIEWS = 'reviews/readUserReviews';
const CREATE_REVIEW = 'reviews/createReview';
const REMOVE_REVIEW = 'reviews/removeReview';

// ACTION CREATORS

const createReview = (newReview) => {
  return {
    type: CREATE_REVIEW,
    payload: newReview
  }
}

// MY THUNKS

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
    case CREATE_REVIEW:
      const createdReviewState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
      createdReviewState.spot[action.payload.id] = action.payload;
      return createdReviewState;
  }
}
