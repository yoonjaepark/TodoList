import { Todo } from "../../interfaces";

export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_REJECTED = 'FETCH_TODOS_REJECTED';

export type Actions = {
  FETCH_TODOS: {
    type: typeof FETCH_TODOS,
    payload: Todo[]
  },
  FETCH_TODOS_REJECTED: {
    type: typeof FETCH_TODOS_REJECTED,
    error: any
  }
}

const todoActions = {
  fetchTodos: (todo: Todo[]): Actions[typeof FETCH_TODOS] => (
    {
      type: FETCH_TODOS,
      payload: todo,
    }
  ),
  fetchProductsRejected: (error: any): Actions[typeof FETCH_TODOS_REJECTED] => (
    {
      type: FETCH_TODOS_REJECTED,
      error,
    }
  )
};

export default todoActions;
