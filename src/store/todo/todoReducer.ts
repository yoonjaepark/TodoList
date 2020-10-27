import { FETCH_TODOS, FETCH_TODOS_REJECTED } from './todoActions';
import RootAction from '../rootAction';
import { Todo } from '../../interfaces';

export type TodoState = {
  todos: Todo[];
  todo: string;
}

const initialState = {
  todos: [],
  todo: '',
};

const products = (state: TodoState = initialState, action: RootAction) => {

  switch (action.type) {
    case FETCH_TODOS:
      return Object.assign({}, state, {
        products: [...state.todos, ...action.payload],
      });
    case FETCH_TODOS_REJECTED:
      return Object.assign({}, state, {
        showError: true,
        error: action.error,
      });
    default:
      return state;
  }
};

export default products;
