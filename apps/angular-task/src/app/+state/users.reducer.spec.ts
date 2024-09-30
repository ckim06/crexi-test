import * as UsersActions from './users.actions';
import { UsersState, initialUsersState, usersReducer } from './users.reducer';
import { userOne, userTwo } from '../mocks/users//test-users.mocks';

describe('Users Reducer', () => {

    describe('valid Users actions', () => {

        it('loadUsersSuccess should return the list of known Users', () => {

            const users = [userOne, userTwo];
            const action = UsersActions.loadUsersSuccess({ users });

            const result: UsersState = usersReducer(initialUsersState, action);

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(2);

        });

        it('selectUserSuccess should return a user', () => {

            const action = UsersActions.selectUserSuccess({ user: userOne });

            const result: UsersState = usersReducer(initialUsersState, action);

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(1);

        });
        it('should toggle favorite', () => {

            const users = [userOne, userTwo];
            UsersActions.loadUsersSuccess({ users });
            const favAction = UsersActions.toggleFavorite({ user: userOne });
            const favresult: UsersState = usersReducer(initialUsersState, favAction);

            expect(favresult.entities[userOne.id]?.isFavorite).toBe(true);

        });

        it('selectUserSuccess should maintain the existing favorite', () => {

            const users = [userOne, userTwo];
            UsersActions.loadUsersSuccess({ users });
            const favAction = UsersActions.toggleFavorite({ user: userOne });
            const result: UsersState = usersReducer(initialUsersState, favAction);

            UsersActions.selectUserSuccess({ user: userOne });

            expect(result.loaded).toBe(true);
            expect(result.entities[userOne.id]?.isFavorite).toBe(true);

        });

    });

});
