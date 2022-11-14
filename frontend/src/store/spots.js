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
    dispatch(loadSpot(singularSpot));
    return singularSpot;
  }
}

// export const createSpot = (spot) => async (dispatch) => {
//   const { address, city, state, country, lat, lng, name, description, price } = spot;
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify({
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price
//     })
//   });
//   const data = await res.json();
//   console.log(data);
//   dispatch(setSpot(data));
//   return res;
// }

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
      const aSpotState = { ...state, allSpots: { ...state.allSpots}, singleSpot: { ...state.singleSpot }}
      aSpotState.singleSpot = action.payload.spot
      return aSpotState
    default:
      return state
  }
}


export default spotsReducer;
