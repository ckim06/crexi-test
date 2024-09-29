import { createFeatureSelector, createSelector,  } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { UsersEntity } from './users.models';

export const {  selectRouteParams } = getRouterSelectors();

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersLoaded = createSelector(selectUsersState, (state: UsersState) => state.loaded);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectedUser = createSelector(selectUsersEntities, selectRouteParams, (entities, { id }) => entities[id]);

export const selectFilters = createSelector(selectUsersState, (state: UsersState) => state.filters);

export const selectFilteredEntities = createSelector(selectAllUsers, selectFilters, (users, filters) => {

    if(users && filters?.search) {

        const searchString = (filters.search || '').toLowerCase();
        return users.filter((user) => user?.name.toLowerCase().indexOf(searchString) > -1);

    }

    return Object.values(users) as UsersEntity[];

});
