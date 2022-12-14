import { csrfFetch } from './csrf';

// TYPES
const READ_SPOTS = 'spots/readSpots';
const READ_SPOT = 'spots/readSpot';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const REMOVE_SPOT = 'spots/removeSpot';

// ACTION CREATORS
const loadSpots = (allSpots) => {
  return {
    type: READ_SPOTS,
    payload: allSpots
  };
};

const loadSpot = (spot) => {
  return {
    type: READ_SPOT,
    payload: spot
  };
}

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    payload: newSpot
  }
}

const updateSpot = (updatedSpot) => {
  return {
    type: UPDATE_SPOT,
    payload: updatedSpot
  }
}

const removeSpot = (deadSpot) => {
  return {
    type: REMOVE_SPOT,
    payload: deadSpot
  }
}
// MY THUNKS
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const allSpots = await res.json();
    console.log(allSpots);
    dispatch(loadSpots(allSpots));
    return allSpots;
  }
}

export const getSingularSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const singularSpot = await res.json();
    console.log(singularSpot)
    dispatch(loadSpot(singularSpot));
    return singularSpot;
  }
}

export const createASpot = (newSpot, imgUrl) => async dispatch => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpot)
  });

  if (res.ok) {
    const createdSpot = await res.json();

    const secRes = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: imgUrl,
        preview: true
      })
    });

    if (secRes.ok) {
      const theNewSpot = await secRes.json();
      dispatch(createSpot(theNewSpot));
      return createdSpot;
    }
  }
};

export const updateASpot = (spotId, updatedInfo) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedInfo)
  })

  if (res.ok) {
    const updatedSpot = res.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  }
}

export const removeASpot = (removalId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${removalId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeSpot(removalId))
  }
}

// REDUCE ME!

const initialState = {
  allSpots: {},
  singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_SPOTS:
      const spotsState = { ...state, allSpots: { ...state.allSpots } };
      action.payload.Spots.forEach(spot => {
        spotsState.allSpots[spot.id] = spot
      });
      return spotsState;
    case READ_SPOT:
      const aSpotState = { ...state, allSpots: { ...state.allSpots}, singleSpot: { ...state.singleSpot } }
      aSpotState.singleSpot = action.payload
      return aSpotState;
    case CREATE_SPOT:
      const createdSpotState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
      createdSpotState.allSpots[action.payload.id] = action.payload;
      createdSpotState.singleSpot = action.payload;
      return createdSpotState;
    case UPDATE_SPOT: {
      const updatedSpot = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
      updatedSpot.singleSpot = action.payload;
      return updatedSpot;
    }
    case REMOVE_SPOT:
      const removalState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
      delete removalState.allSpots[action.payload]
      delete removalState.singleSpot[action.payload]
      return removalState
    default:
      return state
  }
}


export default spotsReducer;
