import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';
import { Metrics } from '@theme/';

export const initialState = Immutable({

  mainParams: null,
  filters:{
    beds : 0,
    baths_full : 0,
    price: {
      from: 0,
      to: 0,
    },
    sqft: {
      from: 0,
      to: 0,
    }
  },
  mainProperties: null,
  selectedProperty: null,
  mapRegion:{
    latitude: 38.138928192103855,
    longitude: -80.53564663281253,
    latitudeDelta: 10,//Zoom of Map = 20
    longitudeDelta: (10 * Metrics.screenWidth) / Metrics.screenHeight,
  },

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
const filters = (state, action) => ({
  ...state,
  filters: action.filters,
});
const mainProperties = (state, action) => ({
  ...state,
  mainProperties: action.mainProperties,
});
const selectedProperty = (state, action) => ({
  ...state,
  selectedProperty: action.selectedProperty,
});
const mapRegion = (state, action) => ({
  ...state,
  mapRegion: action.mapRegion,
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
  [Types.SET_ALGOLIA_MAPREGION]: mapRegion,
  [Types.SET_ALGOLIA_FILTERS]: filters,
  [Types.SET_ALGOLIA_SEARCH_COMMUNITIES]: searchCommunities,
  [Types.SET_ALGOLIA_SEARCH_PROPERTIES]: searchProperties,
  [Types.SET_ALGOLIA_SEARCH_CITIES]: searchCities,
  [Types.SET_ALGOLIA_SEARCH_SCHOOLS]: searchSchools,
};
export default createReducer(initialState, actionHandlers);

