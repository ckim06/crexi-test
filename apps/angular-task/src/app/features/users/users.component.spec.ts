import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersFacade } from '../../+state/users.facade';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import { UsersEntity } from '../../+state/users.models';
import { userOne, userTwo } from '../../mocks/users/test-users.mocks';
describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    const mockFacade = {

        init: jest.fn(),
        toggleFav: jest.fn(),
        setFilterText: jest.fn(),
        filteredUsers$: new Observable< UsersEntity[] >()

    };
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [UsersComponent, BrowserAnimationsModule],
            providers: [
                Router,
                FormBuilder,
                { provide: UsersFacade, useValue: mockFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });
    it('should load  users', () => {

        const filteredUsers$ = new Subject<UsersEntity[]>();
        mockFacade.filteredUsers$ = filteredUsers$.asObservable();
        filteredUsers$.next([userOne, userTwo]);

        mockFacade.filteredUsers$.subscribe(() =>  {

            const firstTitle = fixture.nativeElement.querySelector('.header-title')[0].innerText;
            const secondTitle = fixture.nativeElement.querySelector('.header-title')[1].innerText;
            expect(firstTitle).toBe('Leanne Graham');
            expect(secondTitle).toBe('Ervin Howell');

        });

    });

});
