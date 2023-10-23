import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  name:any
  email:any


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  dashboard() {
    // Use the AuthService to retrieve the token
    const token = this.authService.getToken();

    // Check if the token is available
    if (token) {
      // Use the AuthService to make authenticated HTTP requests
      this.authService.getDashboardData().subscribe(
        (responseData: any) => {
          console.log(responseData);
          // Handle dashboard data here
        },
        (error) => {
          console.error('Dashboard data error', error);
        }
      );
    } else {
      // Handle the case where the token is not available (user is not authenticated)
    }
  }

}
