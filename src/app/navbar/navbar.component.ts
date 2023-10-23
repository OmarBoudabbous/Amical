import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  role: string | null; // Change the type to string | null

  constructor(private router: Router, private authService: AuthService) {
    this.role = this.authService.getUserRole(); // Initialize the role property
  }

  isAuthenticated(): boolean {
    // Use the AuthService to check if the user is authenticated
    return this.authService.isAuthenticated();
  }

  logout() {
    // Use the AuthService to log the user out
    this.authService.logout();

    // Redirect to the login page (or any other appropriate page after logout)
    this.router.navigate(['/login']);
  }
}
