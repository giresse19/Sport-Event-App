/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOGIN,
  LOGOUT,
  LOGINFINAL,
  ADD_RUNNER,
  CONTINUE_RUNNER,
 
} from './constants';

export const initialState = fromJS({
  runnerStart: [],
  runnersFinal: [],
  startRunner: {},
  finishRunner: {},
  fetching: false,
  error: null,
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:      
      return state.set('error', null).set('login', fromJS(action.runnerStart));
    case ADD_RUNNER:
      return state.set('startRunner', fromJS(action.startRunner));
    case LOGINFINAL:
      return state.set('loginFinal', fromJS(action.runnersFinal));
    case CONTINUE_RUNNER:
      return state.set('finishRunner', fromJS(action.finishRunner));
    case LOGOUT:
      return state.set('error', null).set('fetching', false);
    default:
      return state;
  }
}

export default mainPageReducer;
