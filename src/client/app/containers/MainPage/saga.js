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

    socket.on('incorridor', (runners) => {

      console.log('runner in corridor', runners);

      emit(addRunner({ startRunner: runners }));
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

  console.log("this is runnerStart", action.runnerStart);

  const socket = yield call(connect);

  action.runnerStart.forEach((runner) => {
    socket.emit('start', { runner });
  })
  yield fork(handleIO, socket);

}

export function* flowFinal(action) {
  // for finish line crossing
  console.log("this is 2nd payload", action.runnersFinal);
  const socket = yield call(connect);

  action.runnersFinal.forEach((runner) => {
    socket.emit('finish', { runner });
  })

  yield fork(handleIO, socket);

  /* let action = yield take(`${logout}`);
   yield cancel(task);
  socket.emit('logout'); */

}

export default function* watcher() {
  yield [
    takeLatest(LOGIN, flow),
    takeLatest(LOGINFINAL, flowFinal),
  ];
}