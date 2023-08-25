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

export const getAllClaspot = (classId) => async dispatch => {
  const res = await csrfFetch(`/api/classes/${classId}`)

  if (res.ok) {
    const allClaspot = await res.json();
    dispatch(loadClaspot(allClaspot));
    return allClaspot;
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
    case READ_CLASPOT:
      const claspotState = { allClasses: {}, allClaspot: {} };
      action.payload.Spots.forEach(claspot => {
        claspotState.allClaspot[claspot.id] = claspot
      })
      return claspotState
    default:
      return state;
  }
}

export default classesReducer;
