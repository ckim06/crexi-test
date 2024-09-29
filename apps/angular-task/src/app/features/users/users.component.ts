import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UsersFacade } from '../../+state/users.facade';
import { UsersEntity } from '../../+state/users.models';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'crx-users',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule,
        LetDirective, FormsModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'address', 'phone'];
    users$;
    filterForm;

    constructor (private usersFacade: UsersFacade, private router: Router, private fb: FormBuilder) {

        this.users$ = this.usersFacade.filteredUsers$;
        this.filterForm = this.fb.group({
            searchText: [''],
        });

    }

    ngOnInit (): void {

        this.usersFacade.init();
        this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((filters) => {

            this.usersFacade.setFilterText(filters.searchText ?? '');

        });

    }

    onRowClick (row: UsersEntity) {

        this.router.navigateByUrl(`/user/${row.id}`);

    }

    toggleFav (user: UsersEntity) {

        this.usersFacade.toggleFav(user);

    }

}
