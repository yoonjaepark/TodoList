import { Actions as TodoActions } from './todo/todoActions';

type RootAction = TodoActions[keyof TodoActions]

export default RootAction;
