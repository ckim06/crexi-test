import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { UserFilters, UsersEntity } from './users.models';

@Injectable()
export class UsersFacade {

    private readonly store = inject(Store);

    loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
    allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
    filteredUsers$ = this.store.pipe(select(UsersSelectors.selectFilteredEntities));
    selectedUser$ = this.store.pipe(select(UsersSelectors.selectedUser));

    init () {

        this.store.dispatch(UsersActions.initUsers());

    }

    toggleFav (user: UsersEntity) {

        this.store.dispatch(UsersActions.toggleFavorite({ user }));

    }

    setFilters (filters: UserFilters) {

        this.store.dispatch(UsersActions.changeFilter({ filters }));

    }

}
