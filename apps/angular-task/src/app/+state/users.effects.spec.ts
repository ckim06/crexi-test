import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { MockUsersService } from '../mocks/users/test-users';
import { UsersEntity } from './users.models';
import { UsersService } from '../services/users.service';

describe('UsersEffects', () => {

    let actions: Observable<Action>;
    let effects: UsersEffects;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            providers: [UsersEffects, provideMockActions(() => actions), provideMockStore(),
                { provide: UsersService, useValue: MockUsersService }
            ],
        });

        effects = TestBed.inject(UsersEffects);

    });

    describe('init$', () => {

        it('should work', () => {

            const users:UsersEntity[] = [];

            MockUsersService.getAll.mockReturnValue(of(users));
            actions = hot('-a-|', { a: UsersActions.initUsers() });

            const expected = hot('-a-|', { a: UsersActions.loadUsersSuccess({ users }) });

            expect(effects.init$).toBeObservable(expected);

        });

    });

});
