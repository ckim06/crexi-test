import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { UsersEntity } from './users.models';

@Injectable()
export class UsersFacade {

    private readonly store = inject(Store);

    /**
     * Combine pieces of state using createSelector,
     * and expose them as observables through the facade.
     */
    loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
    allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
    filteredUsers$ = this.store.pipe(select(UsersSelectors.selectFilteredEntities));
    selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

    selectedUser$ = this.store.pipe(select(UsersSelectors.selectedUser));

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init () {

        this.store.dispatch(UsersActions.initUsers());

    }

    setSelectedUser (id: string | number) {

        this.store.dispatch(UsersActions.selectUser({ id }));

    }

    toggleFav (user: UsersEntity) {

        this.store.dispatch(UsersActions.toggleFavorite({ user }));

    }

    setFilterText (search: string) {

        const filters = {
            search
        };
        this.store.dispatch(UsersActions.changeFilter({ filters }));

    }

}
