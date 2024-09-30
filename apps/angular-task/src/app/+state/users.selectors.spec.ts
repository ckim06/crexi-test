import { userOne, userTwo } from '../mocks/users/test-users.mocks';

import { usersAdapter, UsersPartialState, initialUsersState } from './users.reducer';
import * as UsersSelectors from './users.selectors';

describe('Users Selectors', () => {

    const ERROR_MSG = 'No Error Available';

    let state: UsersPartialState;

    beforeEach(() => {

        state = {
            users: usersAdapter.setAll([userOne, userTwo], {
                ...initialUsersState,
                selectedId: 1,
                error: ERROR_MSG,
                loaded: true,
                filters: {
                    searchText: 'Leanne'
                }
            }),
        };

    });

    describe('Users Selectors', () => {

        it('selectAllUsers() should return the list of Users', () => {

            const results = UsersSelectors.selectAllUsers(state);
            expect(results.length).toBe(2);

        });

        it('selectUsersLoaded() should return the current "loaded" status', () => {

            const result = UsersSelectors.selectUsersLoaded(state);

            expect(result).toBe(true);

        });

        it('selectUsersError() should return the current "error" state', () => {

            const result = UsersSelectors.selectUsersError(state);

            expect(result).toBe(ERROR_MSG);

        });

        it('selectFilteredEntities() should filter', () => {

            const result = UsersSelectors.selectFilteredEntities(state);

            expect(result.length).toBe(1);

        });

    });

});
