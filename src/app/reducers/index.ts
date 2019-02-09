import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { ITodoState, todoReducer } from '../todo/state/todo.reducer';

export interface AppState {
  todoState: ITodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todoState: todoReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['todoState'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
