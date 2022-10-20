import { csrfFetch } from './csrf';

const SET_SPOT = 'spots/setSpot';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const REMOVE_SPOT = 'spots/removeSpot';

const setSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  const allSpots = await res.json();

}

export const createSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  });
  const data = await res.json();
  console.log(data);
  dispatch(setSpot(data));
  return res;
}
