import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  getAuthUser(): Observable<any> {
    const token = this.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get('http://127.0.0.1:8000/api/user', { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  getParentData(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'

      });
      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get('http://127.0.0.1:8000/api/user/parent', { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  addParent(userParentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
      'Content-Type': 'application/json'
    });

    return this.http.post('http://127.0.0.1:8000/api/add/parent', userParentData, { headers });
  }

  addEnfant(userenfantData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
      'Content-Type': 'application/json'
    });

    return this.http.post('http://127.0.0.1:8000/api/add/enfants', userenfantData, { headers });
  }

  getenfantData(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get('http://127.0.0.1:8000/api/user/enfants', { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  addConjoint(userenfantData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
      'Content-Type': 'application/json'
    });

    return this.http.post('http://127.0.0.1:8000/api/add/conjoint', userenfantData, { headers });
  }

  getConjointData(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'

      });
      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get('http://127.0.0.1:8000/api/user/conjoint', { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  registerUser(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http://127.0.0.1:8000/api/register', userDetails, { headers });
  }

  getUsers(page: number): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get<any>(`http://127.0.0.1:8000/api/users?page=${page}`, { headers });
    } else {
      return new Observable();
    }
  }

  getUserById(userId: number): Observable<User> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Make a request to a protected endpoint on your Laravel backend to get a user by ID
      return this.http.get<User>(`http://127.0.0.1:8000/api/dashboard/users/${userId}`, { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  public addUser(user: any): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return this.http.post<any>('http://127.0.0.1:8000/api/users', user, { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  public editUser(user: User): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Pass the headers as an options object, not inside the request body
      const options = { headers: headers };

      return this.http.put<any>(`http://127.0.0.1:8000/api/users/${user.id}`, user, options);
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.delete(`http://127.0.0.1:8000/api/users/${id}`, { headers });
  }


  update(userId: number, etatAdhesion: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.delete(`http://127.0.0.1:8000/api/users/${userId}/update-etat-adhesion`, { headers });
  }


  public updateEtatAdhesion(userId: number, etat_adhesion: string): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Create an object with etat_adhesion field
      const body = { etat_adhesion: etat_adhesion };
      // Pass the headers as an options object, not inside the request body
      const options = { headers: headers };

      return this.http.put<any>(`http://127.0.0.1:8000/api/user/${userId}/update-etat-adhesion`, body, options);
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }


  getUserByConjointInfo(userId: number): Observable<User> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      // Make a request to a protected endpoint on your Laravel backend to get a user by ID
      return this.http.get<User>(`http://127.0.0.1:8000/api/user/conjoint/adherent/${userId}`, { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

  getAllConventionById(userId: number): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      // Make a request to a protected endpoint on your Laravel backend to get a user by ID
      return this.http.get<any>(`http://127.0.0.1:8000/api/user/convention/getUserInfoById/${userId}`, { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }
  
}