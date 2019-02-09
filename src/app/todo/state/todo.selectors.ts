import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../reducers/index';

import { ITodoState } from './todo.reducer';
import * as fromTodo from './todo.reducer';

export const selectTodoState = createFeatureSelector<AppState, ITodoState>('todoState');

export const selectTodos = createSelector(selectTodoState, fromTodo.getAllTodos);
