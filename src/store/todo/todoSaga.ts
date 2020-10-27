import { put, takeLatest } from 'redux-saga/effects';
import actions, { FETCH_TODO_LIST, POST_TODO, GET_TODO, PATCH_TODO } from './todoActions';
import { getTodoList, addTodo, getTodo, patchTodo } from '../../api/todo';
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
    const data = yield addTodo(payload);
    yield put(actions.addTodo(data));
  } catch (err) {
    yield put(actions.fetchProductsRejected(err.response));
  }
}

export function* getTodoSaga({ payload }: ReturnType<typeof todoActions.getTodo>) {
  try {
    if (payload) {
      const data = yield getTodo(payload);
      yield put(actions.setTodoSelected(data));
    }
  } catch (err) {
    yield put(actions.fetchProductsRejected(err.response));
  }
}

export function* patchTodoSaga({ payload }: ReturnType<typeof todoActions.patchTodo>) {
  try {
    if (payload) {
      const data = yield patchTodo(payload);
      yield put(actions.updateTodo(data));
    }
  } catch (err) {
    yield put(actions.fetchProductsRejected(err.response));
  }
}
export function* TodoSaga() {
  yield takeLatest(FETCH_TODO_LIST, fetchTodosSaga);
  yield takeLatest(POST_TODO, postTodoSaga);
  yield takeLatest(GET_TODO, getTodoSaga);
  yield takeLatest(PATCH_TODO, patchTodoSaga);
}
