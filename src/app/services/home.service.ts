import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HomeData } from '../User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getHomeData(): Observable<HomeData> {
    return this.http.get<HomeData>('http://127.0.0.1:8000/api/home')
  }

  
  addHomeData(homeDataData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    return this.http.post('http://127.0.0.1:8000/api/home', homeDataData, { headers });
  }
}

