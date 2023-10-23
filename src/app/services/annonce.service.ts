import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  addAnnonce(newAnnonceData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
    });
    return this.http.post('http://127.0.0.1:8000/api/annonce', newAnnonceData, { headers });
  }

  getAnnonces(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json' // supprimer cette ligne when i save image append
    });

    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/annonce?page=${page}`, { headers });
  }

  deleteAnnonce(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.delete(`http://127.0.0.1:8000/api/annonce/${id}`, { headers });
  }

  updateAnnonce(id: number, annonceData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
    });

    return this.http.post(`http://127.0.0.1:8000/api/annonce/${id}`, annonceData, { headers });
  }

  getAnnonceById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    return this.http.get(`http://127.0.0.1:8000/api/dashboard/annonce/annonce/${id}`, { headers });
  }

  getAuthDemand(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json' // supprimer cette ligne when i save image append
    });
    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/demandeMobile`, { headers });
  }

  getAnnouncementsByType(type_annonce: string, page: number): Observable<any> {    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json' // supprimer cette ligne when i save image append
    });

    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/announcements?type_annonce=${type_annonce}&page=${page}`, { headers });
  }

}