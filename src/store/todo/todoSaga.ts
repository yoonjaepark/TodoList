import { put, takeLatest } from "redux-saga/effects"
import actions, { FETCH_TODOS } from './todoActions';
import { getTodos } from '../../api/todo';
import todoActions from './todoActions';

export function* fetchTodosSaga({ payload }: ReturnType<typeof todoActions.fetchTodos>) {
  try {
    const data = yield getTodos();
    yield put(actions.fetchTodos(data))
  } catch (err){
    yield put(actions.fetchProductsRejected(err.response))
  }
}

export function* TodoSaga() {
  yield takeLatest(FETCH_TODOS, fetchTodosSaga)
}
