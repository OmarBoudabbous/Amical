import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../User';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId!: number;
  user!: User;
  children: any[] = []; // Property to store children data
  activiteReservations: any[] = []; // Property to store activite reservations data
  conventionReservations: any[] = []; // Property to store convention reservations data
  parent: any = null; // Property to store parent data
  conjoint: any = null; // Property to store conjoint data
  adherent_lAmical: any

  userInfo: any;

  constructor(private router: Router, private sharedService: SharedService, private route: ActivatedRoute, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    // Retrieve the userId from the route parameters
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Convert the 'id' parameter to a number

      // Now that you have the userId, fetch the user's data
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user; // Store the user data in a property
          // Assign children, reservations, parent, and conjoint data
          this.children = user.enfants || [];
          this.activiteReservations = user.activite_reservations || [];
          this.conventionReservations = user.convention_reservations || [];
          this.parent = user.pere_meres;
          this.conjoint = user.conjoint;
          this.adherent_lAmical = this.conjoint?.adhèrent_lAmical
          console.log(this.user);
          this.getUserInfo();
          
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }


  toggleUserEtatAdhesion(user: User) {
    // Toggle between 'Actif' and 'Inactif'
    const newEtatAdhesion = user.etat_adhesion === 'Actif' ? 'Inactif' : 'Actif';

    this.userService.updateEtatAdhesion(user.id, newEtatAdhesion).subscribe(
      (response) => {
        // Reload the page or update the user object with the new state
        this.userService.getUserById(user.id).subscribe(
          (userResponse) => {
            // Update the user object with the new state
            user.etat_adhesion = newEtatAdhesion;
          },
          (error) => {
            this.notificationService.showErrorMessage(JSON.stringify(error.error));
          }
        );
        // Update etat_adhesion in the shared service
        this.sharedService.updateEtatAdhesion(newEtatAdhesion);
      },
      (error) => {
        this.notificationService.showErrorMessage(JSON.stringify(error.error));
      }
    );
  }

  fetchMatchingUserDetails() {
    this.userService.getUserByConjointInfo(this.userId).subscribe(
      (matchingUser: User) => {
        // Handle the response as needed
        console.log('Matching user details:', matchingUser);
        this.userService.getUserById(matchingUser.id).subscribe(
          (user: User) => {
            console.log('matchingUser',matchingUser.id);
            this.router.navigate(['dashboard/admin/users',matchingUser.id]);
          },
          (error) => {
            console.error(error);
          }
        );

        // You can assign matchingUser properties to your component properties here.
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserInfo() {
    this.userService.getAllConventionById(this.userId)
      .subscribe(
        (data) => {
          this.userInfo = data;
          console.log('User Info:', this.userInfo);
          console.log('adsl:', this.userInfo.adsls);
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        }
      );
  }

}
