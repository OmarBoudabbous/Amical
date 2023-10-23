import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(private sharedService: SharedService, private router: Router, private userservice: UserService) { }
  name: any
  email: any
  etat_adhesion: string | null = null;
  image: any
  role: any
  activeDropdown: string = ''; // Initialize activeDropdown as an empty string.

  ngOnInit(): void {
    // Call the AuthService to fetch user data
    this.userservice.getAuthUser().subscribe(
      (userData: any) => {
        // Update the userName property with the user's name
        if (userData && userData.name) {
          this.name = userData.name;
          this.email = userData.email;
          this.etat_adhesion = userData.etat_adhesion;
          this.image = userData.image;
          this.role = userData.role
        }
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    );
  }

  toggleDropdown(dropdown: string) {
    console.log('Toggling dropdown:', dropdown);
    
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = ''; // Close the dropdown if it's already open.
    } else {
      this.activeDropdown = dropdown; // Open the selected dropdown.
    }
    console.log('Active dropdown is now:', this.activeDropdown);
}


}
