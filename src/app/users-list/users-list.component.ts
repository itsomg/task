import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { catchError, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  subscription$: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * get users List
   */
  getUsers(): void {
    this.subscription$ = this.userService.getUsers().pipe(
      tap((res => {
        this.users = res.data;
      }),
        catchError(err => {
          this.userService.cathErrorRes(err);
          return of()
        }))
    ).subscribe();
  }

  /**
   * delete user
   * @param id user Id
   */
  deleteUser(id): void {
    let index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }

  /**
   * destroy component
   */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
