import { put, takeLatest } from 'redux-saga/effects';
import actions, { FETCH_TODO_LIST, POST_TODO } from './todoActions';
import { getTodoList, addTodo } from '../../api/todo';
import todoActions from './todoActions';

export function* fetchTodosSaga({}: ReturnType<typeof todoActions.fetchTodoList>) {
  try {
    const data = yield getTodoList();
    yield put(actions.setTodoList(data));
  } catch (err) {
    yield put(actions.fetchProductsRejected(err.response));
  }
}

export function* postTodoSaga({ payload }: ReturnType<typeof todoActions.postTodo>) {
  try {
    yield addTodo(payload);
    yield put(actions.addTodo(payload));
  } catch (err) {
    yield put(actions.fetchProductsRejected(err.response));
  }
}

export function* TodoSaga() {
  yield takeLatest(FETCH_TODO_LIST, fetchTodosSaga);
  yield takeLatest(POST_TODO, postTodoSaga);
}
