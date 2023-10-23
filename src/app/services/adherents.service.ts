import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AdherentsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }


  public getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), 
    });
    return this.http.get<User[]>(`${this.apiServerUrl}/user`, { headers });
  }

  public addUsers(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), 
    });
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user, { headers });
  }

  public updateUsers(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), 
    });
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user, { headers });
  }

  public deleteUsers(userId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), 
    });
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`, { headers });
  }
}
