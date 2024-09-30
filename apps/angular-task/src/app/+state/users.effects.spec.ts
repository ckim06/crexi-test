import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { UsersEntity } from './users.models';
import { UsersService } from '../services/users.service';
import { routerNavigatedAction } from '@ngrx/router-store';

describe('UsersEffects', () => {

    let actions: Observable<Action>;
    let effects: UsersEffects;
    const mockUserService = {

        getAll: jest.fn(),
        get: jest.fn(),
        toggleFav: jest.fn(),
        setFilterText: jest.fn(),

    };
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            providers: [UsersEffects, provideMockActions(() => actions), provideMockStore(),
                { provide: UsersService, useValue: mockUserService }
            ],
        });

        effects = TestBed.inject(UsersEffects);

    });

    describe('init$', () => {

        it('should work', () => {

            const users:UsersEntity[] = [];
            mockUserService.getAll.mockReturnValue(of(users));

            actions = hot('-a-|', { a: UsersActions.initUsers() });

            const expected = hot('-a-|', { a: UsersActions.loadUsersSuccess({ users }) });

            expect(effects.init$).toBeObservable(expected);

        });
        it('loadUsersFailure', () => {

            const outcome = UsersActions.loadUsersFailure({ error: 'error' });

            actions = hot('-a', { a: UsersActions.initUsers() });
            const response = cold('-#|', {}, 'error');
            const expected = cold('--b', { b: outcome });
            mockUserService.getAll = jest.fn(() => response);

            expect(effects.init$).toBeObservable(expected);

        });

    });

    xdescribe('selectUserByRoute$', () => {

        // it('should work', () => {

        //     mockUserService.get.mockReturnValue(of(userOne));

        //     actions = hot('-a-|', { a: routerNavigatedAction });
        //     const expected = hot('-a-|', { a: UsersActions.selectUserSuccess({ user: userOne }) });
        //     expect(effects.selectUserByRoute$).toBeObservable(expected);

        // });
        it('selectUserFailure', () => {

            const outcome = UsersActions.selectUserFailure({ error: 'error' });

            actions = hot('-a', { a: routerNavigatedAction });
            const response = cold('-#|', {}, 'error');
            const expected = cold('--b', { b: outcome });
            mockUserService.get = jest.fn(() => response);

            expect(effects.selectUserByRoute$).toBeObservable(expected);

        });

    });

});
