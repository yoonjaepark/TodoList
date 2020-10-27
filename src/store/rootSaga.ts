import { all } from 'redux-saga/effects';
import { TodoSaga } from './todo/todoSaga';

export default function* rootSaga() {
  yield all([TodoSaga()]);
}
