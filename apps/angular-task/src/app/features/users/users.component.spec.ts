import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersFacade } from '../../+state/users.facade';
import { MockUsersFacade } from '../../mocks/users/test-users';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async () => {

        const mockFacade = MockUsersFacade;
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

});
