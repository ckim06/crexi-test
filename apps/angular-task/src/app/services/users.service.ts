import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersEntity } from '../+state/users.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor (private http:HttpClient) {

    }

    getAll (): Observable<UsersEntity[]> {

        return this.http.get<UsersEntity[]>('https://jsonplaceholder.typicode.com/users/');

    }

    get (id: string | number): Observable<UsersEntity> {

        return this.http.get<UsersEntity>(`https://jsonplaceholder.typicode.com/users/${id}`);

    }

}
