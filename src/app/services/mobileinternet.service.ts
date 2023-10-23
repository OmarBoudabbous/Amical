import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileinternetService {


  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  // demande Mobile  Interent pour l'adherent 
  addDemandeMobileInternet(newDemandeMobileInternetData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    return this.http.post('http://127.0.0.1:8000/api/demandeMobile', newDemandeMobileInternetData, { headers });
  }

  getAuthDemand(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json' // supprimer cette ligne when i save image append
    });
    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/demandeMobile`, { headers });
  }
}
