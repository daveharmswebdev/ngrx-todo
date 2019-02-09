import { Action } from '@ngrx/store';
import { ITodo } from './todo.reducer';
import { Update } from '@ngrx/entity';

export enum TodoActionTypes {
  AddTodo = '[Todo Component] Add Todo',
  DeleteTodo = '[Todo Component] Delete Todo',
  UpdateDescription = '[Todo Component] Update Description',
  ToggleDone = '[Todo Component] Toggle Done',
  MarkAllAsComplete = '[Todo Component] Mark All As Complete'
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: { todo: ITodo }) {}
}
export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.DeleteTodo;
  constructor(public payload: { id: string }) {}
}
export class UpdateDescription implements Action {
  readonly type = TodoActionTypes.UpdateDescription;
  constructor(public payload: { id: string; newDescription: string }) {}
}
export class ToggleDone implements Action {
  readonly type = TodoActionTypes.ToggleDone;
  constructor(public payload: Update<ITodo>) {}
}

export class MarkAllAsComplete implements Action {
  readonly type = TodoActionTypes.MarkAllAsComplete;

  constructor(public payload: Update<ITodo>[]) {}
}

export type TodoActions = AddTodo | DeleteTodo | UpdateDescription | ToggleDone | MarkAllAsComplete;
