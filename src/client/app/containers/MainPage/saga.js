import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { takeEvery, fork, take, call, put } from 'redux-saga/effects';

import { addRunner, conRunner } from './actions';

import { LOGIN, LOGINFINAL } from './constants';

// socket connection to server with client type
function connect() {
  const socket = io('http://localhost:8000', {
    query: {
      clientType: 'uiClientTest',
    },
  });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

// subscribe for incoming events(socket connection...runners)
function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('incorridor', athlete => {
      console.log('runner in corridor running: ', athlete);

      emit(addRunner({ startRunner: athlete }));
    });

    socket.on('getfinish', athlete => {
      console.log('runner crossed finish: ', athlete);

      emit(conRunner({ finishRunner: athlete }));
    });

    socket.on('disconnect', () => {
      // TODO: non-mandatory task
    });
    return () => {};
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

// entering corridor runner
export function* flow(action) {
  let startRunner = action.runnerStart;

  console.log(
    'runner send signal for entering corridor line: ',
    startRunner,
  );

  const socket = yield call(connect);

  socket.emit('start', { startRunner });

  yield fork(handleIO, socket);
}

// for finish line crossing runner
export function* flowFinal(action) {
  let finishRunner = action.runnersFinal;

  console.log(
    'runner send signal for crossing finish line: ',
    finishRunner,
  );

  const socket = yield call(connect);

  socket.emit('finish', { finishRunner });

  yield fork(handleIO, socket);
}

export default function* watcher() {
  yield [takeEvery(LOGIN, flow), takeEvery(LOGINFINAL, flowFinal)];
}
