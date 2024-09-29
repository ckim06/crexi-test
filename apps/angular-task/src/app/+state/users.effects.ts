import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, filter, withLatestFrom } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from '../services/users.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { selectRouteParams } from './users.selectors';

@Injectable()
export class UsersEffects {

    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private userService = inject(UsersService);

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.initUsers),
            exhaustMap(() => this.userService.getAll().pipe(
                map((users) => users.map((user) => ({ ...user, isFavorite: false }))),
                map((users) => UsersActions.loadUsersSuccess({ users })),
                catchError((error) => {

                    console.error('Error', error);
                    return of(UsersActions.loadUsersFailure({ error }));

                }),
            ),)
        ));
    selectUserByRoute$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            withLatestFrom(this.store$.select(selectRouteParams), (action, params) => params['id']),
            filter((id) => id),
            exhaustMap((id) => this.userService.get(id).pipe(
                map((user) => UsersActions.selectUserSuccess({ user })),
                catchError((error) => {

                    console.error('Error', error);
                    return of(UsersActions.selectUserFailure({ error }));

                }),
            ))
        ));

}
