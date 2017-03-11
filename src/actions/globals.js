import Types from './actionTypes';

export const setMainTab = mainTab =>
  ({ type: Types.SET_MAIN_TAB, mainTab });
export const setSpinnerVisible = spinnerVisible =>
  ({ type: Types.SET_SPINNER_VISIBLE, spinnerVisible });
