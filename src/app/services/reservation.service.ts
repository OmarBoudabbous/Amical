import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  getallReservation(type: string, page: number): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Use backticks for the URL to interpolate the variables correctly
      const url = `http://127.0.0.1:8000/api/reservation/adherent?type=${type}&page=${page}`;

      // Make a request to the protected endpoint on your Laravel backend
      return this.http.get(url, { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }



}
