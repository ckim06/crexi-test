import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '../../../+state/users.facade';
import { LetDirective } from '@ngrx/component';

@Component({
    selector: 'crx-user',
    standalone: true,
    imports: [CommonModule, LetDirective],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {

    @Input() id = '';
    selectedUser$;

    constructor (private usersFacade: UsersFacade) {

        this.selectedUser$ = this.usersFacade.selectedUser$;

    }

    ngOnInit (): void {

        this.usersFacade.setSelectedUser(this.id);

    }

}
