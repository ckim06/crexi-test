import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { MockUsersService } from '../mocks/users/test-users';
import { HttpClient } from '@angular/common/http';

describe('UsersService', () => {

    let service: UsersService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: MockUsersService }]
        });
        service = TestBed.inject(UsersService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

});
