import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

import {defaultSearchParams} from '@api/algoliaAPI';

export const initialState = Immutable({
  properties: null,
  communites: null,
  searchParams:defaultSearchParams,
});

const properties = (state, action) => ({
  ...state,
  properties: action.properties,
});
const communites = (state, action) => ({
  ...state,
  communites: action.communites,
});
const searchParams = (state, action) => ({
  ...state,
  searchParams: action.searchParams,
});

const actionHandlers = {
  [Types.SET_ALGOLIA_PROPERTIES]: properties,
  [Types.SET_ALGOLIA_COMMUNITES]: communites,
  [Types.SET_ALGOLIA_SEARCHPARAMS]: searchParams,
};
export default createReducer(initialState, actionHandlers);

