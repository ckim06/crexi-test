import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { UsersEntity } from './users.models';
import { UsersService } from '../services/users.service';
import { selectRouteParams } from './users.selectors';

describe('UsersEffects', () => {

    let actions: Observable<Action>;
    let effects: UsersEffects;
    let store: MockStore;
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

        store = TestBed.inject(MockStore);
        effects = TestBed.inject(UsersEffects);

        store.overrideSelector(selectRouteParams, { state: {
            action: null,
            params: {
                id: 1,
            },

        },
        navigationId: null, });

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

});
