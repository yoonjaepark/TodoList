import { combineReducers } from 'redux'
import todo, { TodoState } from './todo/todoReducer';

export interface RootState {
  todo: TodoState;
}

const rootState = combineReducers<RootState>({
  todo,
})

export default rootState
