import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UsersFacade } from '../../../+state/users.facade';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import { userOne } from '../../../mocks/users/test-users.mocks';
import { UsersEntity } from '../../../+state/users.models';
describe('UserComponent', () => {

    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    const mockFacade = {

        init: jest.fn(),
        toggleFav: jest.fn(),
        setFilterText: jest.fn(),
        selectedUser$: new Observable<{ user: UsersEntity }>()

    };
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [UserDetailsComponent, BrowserAnimationsModule],
            providers: [{ provide: UsersFacade, useValue: mockFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should load the selected user', () => {

        const selectedUser$ = new Subject<{ user: UsersEntity }>();
        mockFacade.selectedUser$ = selectedUser$.asObservable();
        selectedUser$.next({ user: userOne });

        mockFacade.selectedUser$.subscribe(() =>  {

            const title = fixture.nativeElement.querySelector('.mat-title-medium').innerText;
            expect(title).toBe('Leanne Graham');

        });

    });

});
