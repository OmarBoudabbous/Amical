import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  addFournisseur(fournisseurData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(), // Call the getToken function to get the token value
      'Content-Type': 'application/json'
    });
    return this.http.post('http://127.0.0.1:8000/api/fournisseur', fournisseurData, { headers });
  }

  getFournisseurData(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/fournisseur?page=${page}`, { headers });
  }

  deleteFournisseur(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.delete(`http://127.0.0.1:8000/api/fournisseur/${id}`, { headers });
  }

  updateFournisseur(id: number, fournisseurData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    console.log('fournisseurData:', fournisseurData);

    return this.http.put(`http://127.0.0.1:8000/api/fournisseur/${id}`,  fournisseurData , { headers });
  }
  


  getAllFournisseur(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/fournisseur/all`, { headers });
  }

  getFournisseurByID(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });
    // Make a request to a protected endpoint on your Laravel backend with a page parameter
    return this.http.get(`http://127.0.0.1:8000/api/fournisseur/${id}`, { headers });
  }
}
