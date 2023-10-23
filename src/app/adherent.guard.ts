import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdherentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (userRole === 'adherent') {
      return true; // Allow access for 'Adherent'
    } else {
      this.router.navigate(['/404']); // Redirect to 404 page for other roles
      return false; // Deny access
    }
  }
}