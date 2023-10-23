import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdslService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  // demande Engagement d'Achat pour l'adherent 
  addAdsl(newAdsl: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    return this.http.post('http://127.0.0.1:8000/api/adsl', newAdsl, { headers });
  }
}
