import { search } from "../../../backend/routes/api";
import { csrfFetch } from "./csrf";

// TYPES
const SEARCH = 'search/SEARCH';

// ACTION CREATORS

const searchResults = (allSpots) => {
  return {
    type: SEARCH,
    payload: allSpots
  };
};

// MY THUNKS

export const getAllSeaque = (searchWord) = async (dispatch) => {
  const res = await csrfFetch(`/api/search/${searchWord}`)

  if (res.ok) {
    const allSeaque = await res.json();
    dispatch(searchResults(allSeaque));
    return allSeaque
  }
}

// REDUCE ME

const initialState = {
  allSeaque: {}
}


const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      const searchState = { allSeaque: {} };
      action.payload.Spots.forEach(seaque => {
        searchState.allSeaque[seaque.id] = seaque
      })
      return searchState;
    default:
      return state;
  }
};

export default searchReducer;
