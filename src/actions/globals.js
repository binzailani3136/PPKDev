import Types from './actionTypes';

export const setHomeTab = homeTab =>
  ({ type: Types.SET_HOME_TAB, homeTab });
export const setSpinnerVisible = spinnerVisible =>
  ({ type: Types.SET_SPINNER_VISIBLE, spinnerVisible });
