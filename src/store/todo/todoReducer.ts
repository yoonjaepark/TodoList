import {
  FETCH_TODO_LIST,
  FETCH_TODO_REJECTED,
  SET_TODO_LIST,
  ADD_TODO,
  SET_TODO_SELECTED,
  EMPTY_SELECTED,
  UPDATE_TODO,
} from './todoActions';
import RootAction from '../rootAction';
import { Todo } from '../../interfaces';
import _ from 'lodash';

const initSelected = {
  title: '',
  body: '',
  completed: false,
  endDate: '',
  priority: '',
};

export type TodoState = {
  list: Todo[];
  selected: Todo;
}

const initialState = {
  list: [],
  selected: initSelected,
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
    case SET_TODO_SELECTED:
      return Object.assign({}, state, {
        selected: action.payload,
      });
    case EMPTY_SELECTED:
      return Object.assign({}, state, {
        selected: initSelected,
      });
    case UPDATE_TODO:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default products;
