import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {

    private actions$ = inject(Actions);
    private  userService = inject(UsersService);

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

    selectUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.selectUser),
            exhaustMap((action) => this.userService.get(action.id).pipe(
                map((user) => UsersActions.selectUserSuccess({ user })),
                catchError((error) => {

                    console.error('Error', error);
                    return of(UsersActions.selectUserFailure({ error }));

                }),
            ),)
        ));

}
