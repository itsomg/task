import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /**
   * getUsers
   * @returns Users List
   */
  public getUsers(): Observable<any> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}users`);
  }

  /**
   * get user by id
   * @param id user id
   * @returns User
   */
  getUser(id: any) {
    return this.httpClient.get<User>(`${environment.baseUrl}users`, {
      params: new HttpParams().set('id', id)
    });
  }
  

  /**
   * cath error 
   * @param err Error
   * @returns Error
   */
  cathErrorRes(err: HttpErrorResponse) {
    console.log(err.error);
    return err;
  }
}
