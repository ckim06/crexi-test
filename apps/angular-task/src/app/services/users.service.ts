import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersEntity } from '../+state/users.models';
import { HttpClient } from '@angular/common/http';
import { userOne, userTwo } from '../mocks/users/test-users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor (private http:HttpClient) {

    }

    getAll (): Observable<UsersEntity[]> {

        return of([userOne, userTwo]);

    }

    get (_id: string | number): Observable<UsersEntity> {

        return of(userOne);

    }

}
