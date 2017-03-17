import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({

  mainParams: null,
  mainProperties: null,
  selectedProperty: null,

  searchParams: null,
  searchCommunities:null,
  searchProperties:null,
  searchCities:null,
  searchSchools:null,
});

const mainParams = (state, action) => ({
  ...state,
  mainParams: action.mainParams,
});
const mainProperties = (state, action) => ({
  ...state,
  mainProperties: action.mainProperties,
});
const selectedProperty = (state, action) => ({
  ...state,
  selectedProperty: action.selectedProperty,
});
const searchCommunities = (state, action) => ({
  ...state,
  searchCommunities: action.searchCommunities,
});
const searchProperties = (state, action) => ({
  ...state,
  searchProperties: action.searchProperties,
});
const searchCities = (state, action) => ({
  ...state,
  searchCities: action.searchCities,
});
const searchSchools = (state, action) => ({
  ...state,
  searchSchools: action.searchSchools,
});
const searchParams = (state, action) => ({
  ...state,
  searchParams: action.searchParams,
});

const actionHandlers = {
  [Types.SET_ALGOLIA_MAIN_PARAMS]: mainParams,
  [Types.SET_ALGOLIA_MAIN_PROPERTIES]: mainProperties,
  [Types.SET_ALGOLIA_SELECTEDPROPERTY]: selectedProperty,
  [Types.SET_ALGOLIA_SEARCH_PARAMS]: searchParams,
  [Types.SET_ALGOLIA_SEARCH_COMMUNITIES]: searchCommunities,
  [Types.SET_ALGOLIA_SEARCH_PROPERTIES]: searchProperties,
  [Types.SET_ALGOLIA_SEARCH_CITIES]: searchCities,
  [Types.SET_ALGOLIA_SEARCH_SCHOOLS]: searchSchools,
};
export default createReducer(initialState, actionHandlers);

