import { Todo } from '../../interfaces';

export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const FETCH_TODO_REJECTED = 'FETCH_TODO_REJECTED';
export const SET_TODO_LIST = 'SET_TODO_LIST';
export const ADD_TODO = 'ADD_TODO';
export const POST_TODO = 'POST_TODO';

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
};

export default todoActions;
