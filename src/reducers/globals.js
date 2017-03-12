import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  mainTab: 'Find Homes',
  spinnerVisible: false,
});
const mainTab = (state, action) => ({
  ...state,
  mainTab: action.mainTab,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});

const actionHandlers = {
  [Types.SET_MAIN_TAB]: mainTab,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
};
export default createReducer(initialState, actionHandlers);

