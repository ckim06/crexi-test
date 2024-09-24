import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UserFilters, UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UsersEntity> {
    selectedId?: string | number; // which Users record has been selected
    selectedUser?: UsersEntity;
    loaded: boolean; // has the Users list been loaded
    error?: string | null; // last known error (if any)
    filters?: UserFilters;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> = createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
});
export const getFilters = (state: UsersState) => state.filters;
const reducer = createReducer(
    initialUsersState,
    on(UsersActions.initUsers, (state) => ({ ...state, loaded: false, error: null })),
    on(UsersActions.selectUser, (state) => ({ ...state, loaded: false, error: null })),
    on(UsersActions.selectUserSuccess, (state, { user }) => ({ ...state, selectedUser: user })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, { ...state, loaded: true })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
    on(UsersActions.changeFilter, (state, { filters }) => ({ ...state, loaded: false, error: null, filters })),

    on(UsersActions.toggleFavorite, (state, { user }) =>
        usersAdapter.setOne({ ...user, isFavorite: !user.isFavorite }, { ...state, loaded: true })),

);

export function usersReducer (state: UsersState | undefined, action: Action) {

    return reducer(state, action);

}
