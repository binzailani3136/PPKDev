import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  properties: null,
  communites: null,
  searchParams: null,
  selectedProperty:null,
});

const properties = (state, action) => ({
  ...state,
  properties: action.properties,
});
const communities = (state, action) => ({
  ...state,
  communites: action.communities,
});
const searchParams = (state, action) => ({
  ...state,
  searchParams: action.searchParams,
});
const selectedProperty = (state, action) => ({
  ...state,
  selectedProperty: action.selectedProperty,
});

const actionHandlers = {
  [Types.SET_ALGOLIA_PROPERTIES]: properties,
  [Types.SET_ALGOLIA_COMMUNITIES]: communities,
  [Types.SET_ALGOLIA_SEARCHPARAMS]: searchParams,
  [Types.SET_ALGOLIA_SELECTEDPROPERTY]: selectedProperty,
};
export default createReducer(initialState, actionHandlers);

