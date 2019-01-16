import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

import { takeEvery, fork, take, call, put } from 'redux-saga/effects';

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

  let startRunner = action.runnerStart;

  console.log("start runners", startRunner);

  const socket = yield call(connect);
  
  socket.emit('start', { startRunner }); 

  yield fork(handleIO, socket);
}

// for finish line crossing
export function* flowFinal(action) {  

  let runner = action.runnersFinal

  console.log("this is 2nd payload", runner);

  const socket = yield call(connect);

  socket.emit('finish', { runner });

  yield fork(handleIO, socket);
}

export default function* watcher() {
  yield [
    takeEvery(LOGIN, flow),
    takeEvery(LOGINFINAL, flowFinal),
  ];
}
