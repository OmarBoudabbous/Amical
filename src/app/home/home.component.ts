import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { HomeService } from '../services/home.service';
import { HomeData } from '../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isDarkMode: boolean = false; // Property to track the current mode
  role: string | null; // Change the type to string | null
  homeData!: HomeData | null; // Define a property to store the home data

  constructor(private router: Router, private authService: AuthService , private homeService:HomeService) {
    this.role = this.authService.getUserRole(); // Initialize the role property
  }

  ngOnInit(): void {
    // Fetch the home data when the component initializes
    this.homeService.getHomeData().subscribe(
      (data) => {
        this.homeData = data;
        console.log(this.homeData);
        
      },
      (error) => {
        console.error('Error fetching home data:', error);
      }
    );
  }



  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // You can also save the user's preference in local storage
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
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
