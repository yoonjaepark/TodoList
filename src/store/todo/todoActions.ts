import { Todo } from '../../interfaces';

export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const FETCH_TODO_REJECTED = 'FETCH_TODO_REJECTED';
export const SET_TODO_LIST = 'SET_TODO_LIST';
export const ADD_TODO = 'ADD_TODO';
export const POST_TODO = 'POST_TODO';
export const SET_TODO_SELECTED = 'SET_TODO_SELECTED';
export const GET_TODO = 'GET_TODO';
export const EMPTY_SELECTED = 'EMPTY_SELECTED';
export const UPDATE_TODO = 'UPDATE_TODO';
export const PATCH_TODO = 'PATCH_TODO';

export type Actions = {
  FETCH_TODO_LIST: {
    type: typeof FETCH_TODO_LIST,
  },
  FETCH_TODO_REJECTED: {
    type: typeof FETCH_TODO_REJECTED,
    error: any
  },
  SET_TODO_LIST: {
    type: typeof SET_TODO_LIST,
    payload: Todo[]
  },
  ADD_TODO: {
    type: typeof ADD_TODO,
    payload: Todo
  },
  POST_TODO: {
    type: typeof POST_TODO,
    payload: Todo
  },
  GET_TODO: {
    type: typeof GET_TODO,
    payload: number | undefined
  },
  SET_TODO_SELECTED: {
    type: typeof SET_TODO_SELECTED,
    payload: Todo
  },
  EMPTY_SELECTED: {
    type: typeof EMPTY_SELECTED,
  },
  UPDATE_TODO: {
    type: typeof UPDATE_TODO,
    payload: Todo,
  },
  PATCH_TODO: {
    type: typeof PATCH_TODO,
    payload: Todo,
  }
}

export const todoActions = {
  fetchTodoList: (): Actions[typeof FETCH_TODO_LIST] => (
    {
      type: FETCH_TODO_LIST,
    }
  ),
  fetchProductsRejected: (error: any): Actions[typeof FETCH_TODO_REJECTED] => (
    {
      type: FETCH_TODO_REJECTED,
      error,
    }
  ),
  setTodoList: (todos: Todo[]): Actions[typeof SET_TODO_LIST] => (
    {
      type: SET_TODO_LIST,
      payload: todos,
    }
  ),
  addTodo: (todo: Todo): Actions[typeof ADD_TODO] => (
    {
      type: ADD_TODO,
      payload: todo,
    }
  ),
  postTodo: (todo: Todo): Actions[typeof POST_TODO] => (
    {
      type: POST_TODO,
      payload: todo,
    }
  ),
  getTodo: (id: number | undefined): Actions[typeof GET_TODO] => (
    {
      type: GET_TODO,
      payload: id,
    }
  ),
  setTodoSelected: (todo: Todo): Actions[typeof SET_TODO_SELECTED] => (
    {
      type: SET_TODO_SELECTED,
      payload: todo,
    }
  ),
  emptySelected: (): Actions[typeof EMPTY_SELECTED] => (
    {
      type: EMPTY_SELECTED,
    }
  ),
  updateTodo: (todo: Todo): Actions[typeof UPDATE_TODO] => (
    {
      type: UPDATE_TODO,
      payload: todo
    }
  ),
  patchTodo: (todo: Todo): Actions[typeof PATCH_TODO] => (
    {
      type: PATCH_TODO,
      payload: todo
    }
  ),
};

export default todoActions;
