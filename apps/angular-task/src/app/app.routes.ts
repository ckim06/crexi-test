import { Route } from '@angular/router';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';
import { UsersComponent } from './features/users/users.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';

export const appRoutes: Route[] = [
    { path: 'user/:id', component: UserDetailsComponent },
    {
        path: '',
        component: UsersComponent,
        providers: [UsersFacade, provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
            provideEffects(UsersEffects)],
    },
];
