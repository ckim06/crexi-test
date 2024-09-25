import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';
import { USERS_FEATURE_KEY, UsersState, usersReducer } from './users.reducer';
import { userOne, userTwo } from '../mocks/users/test-users.mocks';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
interface TestSchema {
    users: UsersState;
}

describe('UsersFacade', () => {

    let facade: UsersFacade;
    let store: Store<TestSchema>;

    describe('used in NgModule', () => {

        beforeEach(() => {

            @NgModule({
                imports: [StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),

                    EffectsModule.forFeature([UsersEffects])],
                providers: [UsersFacade, provideHttpClient(withInterceptorsFromDi())],
            })
            class CustomFeatureModule {}

            @NgModule({
                imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
            })
            class RootModule {}
            TestBed.configureTestingModule({ imports: [RootModule],
                providers: [] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(UsersFacade);

        });

        /**
         * The initially generated facade::loadAll() returns empty array
         */
        it('loadAll() should return empty list with loaded == true', async () => {

            const list = await firstValueFrom(facade.allUsers$);
            const isLoaded = await firstValueFrom(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            facade.init();

        });

        /**
         * Use `loadUsersSuccess` to manually update list
         */
        it('allUsers$ should return the loaded list; and loaded flag == true', async () => {

            let list = await firstValueFrom(facade.allUsers$);
            let isLoaded = await firstValueFrom(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            store.dispatch(UsersActions.loadUsersSuccess({
                users: [userOne, userTwo],
            }),);

            list = await firstValueFrom(facade.allUsers$);
            isLoaded = await firstValueFrom(facade.loaded$);

            expect(list.length).toBe(2);
            expect(isLoaded).toBe(true);

        });

    });

});
