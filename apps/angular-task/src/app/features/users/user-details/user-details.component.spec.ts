import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UsersFacade } from '../../../+state/users.facade';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserComponent', () => {

    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    beforeEach(async () => {

        const mockFacade = {

            init: jest.fn(),
            setSelectedUser: jest.fn(),
            toggleFav: jest.fn(),
            setFilterText: jest.fn(),

        };
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

});
