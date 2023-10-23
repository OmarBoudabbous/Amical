import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(private authService: AuthService, private router: Router) { }
  name: any
  email: any
  image: any
  ngOnInit(): void {
    // Call the AuthService to fetch user data
    this.authService.getUserData().subscribe(
      (userData: any) => {
        // Update the userName property with the user's name
        if (userData && userData.name) {
          this.name = userData.name;
          this.email = userData.email;
          this.image=userData.image;
        }        
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    );
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
