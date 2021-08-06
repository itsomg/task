import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;
  subscription$: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.getUser(param['id'])
    })
  }

  /**
   * get user by id
   * @param id user id
   */
  getUser(id) {
    this.subscription$ = this.userService.getUser(id).pipe(
      map((res => {
        this.user = res.data;
      }),
        catchError(err => {
          this.userService.cathErrorRes(err);
          return of()
        }))
    ).subscribe()
  }

  /**
  * destroy component
  */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
