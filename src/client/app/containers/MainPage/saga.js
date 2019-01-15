import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

import { takeLatest, fork, take, call, put, cancel } from 'redux-saga/effects';

import {
  addRunner, conRunner
} from './actions';

import {
  LOGIN, LOGINFINAL,
} from './constants';

function connect() {
  console.log("I am in websocket connect in saga file")
  const socket = io('http://localhost:8000', {
    query: {
      clientType: 'uiClientTest'
    }
  });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {

    socket.on('incorridor', (athlete) => {

      console.log('runner in corridor', athlete);

      emit(addRunner({ startRunner: athlete }));
    });

    socket.on('getfinish', (runnersFinal) => {

      console.log('runner in finish', runnersFinal);

      emit(conRunner({ finishRunner: runnersFinal }));
    });

    socket.on('disconnect', () => {
      // TODO: non-mandatory task          
    });
    return () => { };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
}

export function* flow(action) {

  let runner = [];

  let startRunner = action.runnerStart;

  console.log("start runners", startRunner);

  const socket = yield call(connect);

  runner.push(startRunner)

  runner.forEach((startRunner) => {

    console.log("runner runner pushed to server", startRunner)

    socket.emit('start', { startRunner });
  })

  // sending each runner entering corridor to server
  //  socket.emit('start', { startRunner });  


  yield fork(handleIO, socket);

}

export function* flowFinal(action) {

  // for finish line crossing
  let runner = action.runnersFinal
  console.log("this is 2nd payload", runner);

  const socket = yield call(connect);

  socket.emit('finish', { runner });

  /*   action.runnersFinal.forEach((runner) => {
      socket.emit('finish', { runner });
    })
   */
  yield fork(handleIO, socket);
}

export default function* watcher() {
  yield [
    takeLatest(LOGIN, flow),
    takeLatest(LOGINFINAL, flowFinal),
  ];
}