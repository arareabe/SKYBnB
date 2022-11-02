import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = 'spots/readAllSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const REMOVE_SPOT = 'spots/removeSpot';

const loadSpots = (allSpots) => {
  return {
    type: READ_ALL_SPOTS,
    payload: allSpots
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  const allSpots = await res.json();
  console.log(allSpots);
  dispatch(loadSpots(allSpots));
  return allSpots;
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
    case READ_ALL_SPOTS:
      const newState = { ...state, allSpots: {} };
      action.payload.Spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      });
      return newState;

    default:
      return state
  }
}


export default spotsReducer;
