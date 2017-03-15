import { combineReducers } from 'redux-immutable';
import globals from './globals';
import route from './route';
import algolia from './algolia';

const applicationReducers = {
  globals,
  route,
  algolia
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
