import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  addActivite(formdata: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    return this.http.post('http://127.0.0.1:8000/api/activites', formdata, { headers });
  }

  getActiviteData(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/activites?page=${page}`, { headers });
  }

  deleteActivite(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.delete(`http://127.0.0.1:8000/api/activites/${id}`, { headers });
  }

  updateActivite(id: number, activiteData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.put(`http://127.0.0.1:8000/api/activites/${id}`, activiteData, { headers });
  }

  getActivityById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.get(`http://127.0.0.1:8000/api/dashboard/activities/activities/${id}`, { headers });
  }


  updateActivityImage(id: number, newImage: File): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    const formData = new FormData();
    formData.append('image', newImage);

    return this.http.post(`http://127.0.0.1:8000/api/activites/${id}/update-image`, formData, { headers });
  }


  reservation(reservationData: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      }),
    };
    return this.http.post(`http://127.0.0.1:8000/api/activites/${reservationData.activity_id}/reservations`, reservationData, options);
  }
  

  getActivitesValid(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/activites/adherent?page=${page}`, { headers });
  }
}
