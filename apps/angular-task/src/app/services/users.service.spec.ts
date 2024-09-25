import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UsersService', () => {

    let service: UsersService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [HttpClient, provideHttpClient(withInterceptorsFromDi())]
        });
        service = TestBed.inject(UsersService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

});
