import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { TodoActions, TodoActionTypes } from './todo.actions';
export interface ITodo {
  id: string;
  description: string;
  owner: string;
  complete: boolean;
}

import { v4 as uuid } from 'uuid';

export interface ITodoState extends EntityState<ITodo> {}

export const todoAdapter: EntityAdapter<ITodo> = createEntityAdapter();

export const initialTodoState: ITodoState = todoAdapter.getInitialState();

export function todoReducer(
  state: ITodoState = initialTodoState,
  action: TodoActions
): ITodoState {
  switch (action.type) {
    case TodoActionTypes.AddTodo: {
      console.log(action.payload.todo);
      const todo = {
        ...action.payload.todo,
        id: uuid()
      };
      console.log(todo);
      return todoAdapter.addOne(todo, state);
    }
    case TodoActionTypes.DeleteTodo: {
      return todoAdapter.removeOne(action.payload.id, state);
    }
    case TodoActionTypes.UpdateDescription: {
      return todoAdapter.updateOne(
        {
          id: action.payload.id,
          changes: { description: action.payload.newDescription }
        },
        state
      );
    }
    case TodoActionTypes.ToggleDone: {
      return todoAdapter.updateOne(action.payload, state);
    }
    case TodoActionTypes.MarkAllAsComplete: {
      return todoAdapter.updateMany(action.payload, state);
    }
    default:
      return state;
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todoAdapter.getSelectors();

export const getAllTodos = selectAll;


