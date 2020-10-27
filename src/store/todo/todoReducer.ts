import { FETCH_TODO_LIST, FETCH_TODO_REJECTED, SET_TODO_LIST, ADD_TODO } from './todoActions';
import RootAction from '../rootAction';
import { Todo } from '../../interfaces';

export type TodoState = {
  list: Todo[];
  selected: Todo;
}

const initialState = {
  list: [],
  selected: {
    title: '',
    body: '',
    completed: false,
    endDate: '',
    priority: '',
  },
};

const products = (state: TodoState = initialState, action: RootAction) => {

  switch (action.type) {
    case FETCH_TODO_LIST:
      return Object.assign({}, state, {
        list: state.list,
      });
    case FETCH_TODO_REJECTED:
      return Object.assign({}, state, {
        showError: true,
        error: action.error,
      });
    case SET_TODO_LIST:
      return Object.assign({}, state, {
        list: action.payload,
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        list: [action.payload, ...state.list],
      });
    default:
      return state;
  }
};

export default products;
