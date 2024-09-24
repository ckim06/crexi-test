import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '../../../+state/users.facade';

@Component({
    selector: 'crx-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {

    selectedUser$;

    constructor (private usersFacade: UsersFacade) {

        this.selectedUser$ = this.usersFacade.selectedUser$;

    }

}
