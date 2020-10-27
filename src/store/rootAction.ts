import todoActions, { Actions as TodoActions } from './todo/todoActions';

type RootAction = TodoActions[keyof TodoActions]

export const actions = {
  todos: todoActions
};

export default RootAction;
