import { createAction, props } from '@ngrx/store';
import { UserFilters, UsersEntity } from './users.models';

export const initUsers = createAction('[Users Page] Init');
export const selectUser = createAction('[Users/Page] Select User', props<{ id: string | number }>());
export const selectUserSuccess = createAction('[Users/API] Load User Success', props<{ user: UsersEntity }>());
export const loadUsersSuccess = createAction('[Users/API] Load Users Success', props<{ users: UsersEntity[] }>());

export const loadUsersFailure = createAction('[Users/API] Load Users Failure', props<{ error: string }>());
export const selectUserFailure = createAction('[Users/API] Load User Failure', props<{ error: string }>());

export const changeFilter = createAction('[Users/Page] Change Filter', props<{ filters: UserFilters }>());

export const toggleFavorite = createAction('[Users/Page] Toggle Favorite', props<{ user: UsersEntity }>());
