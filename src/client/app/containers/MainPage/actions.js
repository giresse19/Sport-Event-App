/*
 *
 * MainPage actions
 *
 */

import {  
  LOGIN,
  ADD_RUNNER,
  CONTINUE_RUNNER,
  LOGOUT,
  LOGINFINAL,
  } from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function login(runnerStart) {
  return {
    type: LOGIN,    
    runnerStart
    };
}

export function loginFinal(runnersFinal) {
  return {
    type: LOGINFINAL,    
    runnersFinal
    };
}

export function addRunner(startRunner) {
  return {
    type: ADD_RUNNER,    
    startRunner
    };
}

export function conRunner(finishRunner) {
  return {
    type: CONTINUE_RUNNER,    
    finishRunner
    };
}