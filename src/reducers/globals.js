import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  homeTab: 'HOME',
  spinnerVisible: false,
});
const homeTab = (state, action) => ({
  ...state,
  homeTab: action.homeTab,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});

const actionHandlers = {
  [Types.SET_HOME_TAB]: homeTab,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
};
export default createReducer(initialState, actionHandlers);

