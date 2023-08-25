import { csrfFetch } from "./csrf";

// TYPES
const READ_CLASSES = 'classes/readClasses'
const READ_CLASPOT = 'classes/readClaspot'

// ACTION CREATORS
const loadClasses = (allClasses) => {
  return {
    type: READ_CLASSES,
    payload: allClasses
  };
};

const loadClaspot = (allClaspot) => {
  return {
    type: READ_CLASPOT,
    payload: allClaspot
  };
};

// MY THUNKS
export const getAllClasses = () => async dispatch => {
  const res = await csrfFetch(`/api/classes/`)

  if (res.ok) {
    const allClasses = await res.json();
    console.log('THIS IS THE TRUE CLAS', allClasses)
    dispatch(loadClasses(allClasses))
    return allClasses;
  }
}

// REDUCE ME
const initialState = {
  allClasses: {},
  allClaspot: {}
}

const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_CLASSES:
      const classesState = { ...state, allClasses: { ...state.allClasses } };
      action.payload.Classes.forEach(clas => {
        classesState.allClasses[clas.id] = clas
      })
      return classesState;
    default:
      return state;
  }
}

export default classesReducer;
