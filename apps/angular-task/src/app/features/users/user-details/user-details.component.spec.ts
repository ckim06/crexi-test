import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UsersFacade } from '../../../+state/users.facade';
import { MockUsersFacade } from '../../../mocks/users/test-users';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserComponent', () => {

    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    beforeEach(async () => {

        const mockFacade = MockUsersFacade;
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
