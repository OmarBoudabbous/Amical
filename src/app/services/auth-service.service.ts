import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(cin: string, matricule: string): Observable<any> {
    const bodyData = {
      cin: cin,
      matricule: matricule
    };

    return this.http.post('http://127.0.0.1:8000/api/login', bodyData).pipe(
      tap((response: any) => {
        // Assuming your API returns the user's role in the response
        const userRole = response.user.role;
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('user_role', userRole);
      })
    );
  }

  getUserRole(): string | null {
    // Get the user's role from local storage
    return localStorage.getItem('user_role');
  }

  logout() {
    // Remove the auth_token from local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');

    // Redirect to the login page (or any other appropriate page after logout)
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., based on the presence of auth_token)
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    // Get the authentication token from local storage
    return localStorage.getItem('auth_token');
  }

  getDashboardData(): Observable<any> {
    // Retrieve the token from local storage
    const token = this.getToken();

    // Check if the token is available
    if (token) {
      // Include the token in your HTTP headers
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Make authenticated HTTP requests
      return this.http.get('http://127.0.0.1:8000/api/dashboard', { headers });
    } else {
      // You can handle the case where the token is not available (user is not authenticated) here.
      // For example, you can return an observable with an error or handle it as needed.
      return new Observable(); // You should define an appropriate behavior here.
    }
  }

  getUserData(): Observable<any> {
    const token = this.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Make a request to a protected endpoint on your Laravel backend
      return this.http.get('http://127.0.0.1:8000/api/user', { headers });
    } else {
      return new Observable(); // Handle the case where there's no token
    }
  }

 
}
