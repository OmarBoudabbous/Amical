import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { User } from '../User';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-index-component',
  templateUrl: './dashboard-index-component.component.html',
  styleUrls: ['./dashboard-index-component.component.scss']
})
export class DashboardIndexComponentComponent {
  users: User[] = [];
  user: any = {};

  name: any = ''
  prenom: any = ''
  matricule: any = ''
  affectation: any = ''
  gsm: any = ''
  cin: any = ''
  date_naissance: any = ''
  etat_civil: any = ''
  fonction: any = ''
  adresse: any = ''
  image: any = ''
  cotaannuellesubvention: any

  currentPage: number = 1; // Initialize to the first page
  totalPages: number = 0;


  constructor(private notificationService: NotificationService, private userService: UserService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    // Subscribe to route parameter changes to update the current page
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.getUsers();
    });
  }

  getUsers(): void {
    this.userService.getUsers(this.currentPage).subscribe(
      (response: any) => {
        console.log(response);

        this.users = response.data; 
        this.totalPages = response.last_page; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  viewUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        console.log(userId);
        this.router.navigate(['dashboard/admin/users', userId]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  hoveredUserIds: number[] = []; // Array to track hovered user IDs
  isHovered(userId: number): boolean {
    return this.hoveredUserIds.includes(userId);
  }

  // Function to handle mouse enter event
  onMouseEnter(userId: number) {
    this.hoveredUserIds.push(userId);
  }

  // Function to handle mouse leave event
  onMouseLeave(userId: number) {
    this.hoveredUserIds = this.hoveredUserIds.filter(id => id !== userId);
  }

  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image?.name);
  }
 // create user
  public createUser(): void {
    let newUser = {
      "name": this.name,
      "prenom": this.prenom,
      "matricule": this.matricule,
      "gsm": this.gsm,
      "date_naissance": this.date_naissance,
      "etat_civil": this.etat_civil,
      "fonction": this.fonction,
      "affectation": this.affectation,
      "adresse": this.adresse,
      "cin": this.cin,
      "cotaannuellesubvention": this.cotaannuellesubvention,
      "image": this.image,
    }
    // Now, you can send the newUser object to your service for creating a new user
    this.userService.addUser(newUser).subscribe(
      (response) => {
        console.log('Activite created successfully:', response);
        // Handle success response here
        this.notificationService.showSuccessMessage('activite enregister avec succeé');

        this.name = ''
        this.prenom = ''
        this.affectation = ''
        this.gsm = ''
        this.matricule = ''
        this.cin = ''
        this.date_naissance = ''
        this.etat_civil = ''
        this.fonction = ''
        this.adresse = ''
        this.image = ''
        this.cotaannuellesubvention = null


        // After adding the activite, fetch the updated data
        this.getUsers();

      },
      (error) => {
        // Handle error, e.g., show an error message
        if (error.error && error.error.message) {
          this.notificationService.showErrorMessage(error.error.message);
        } else {
          this.notificationService.showErrorMessage('An error occurred during login.');
        }
      }
    );
  }

  //show by id 
  viewUser(userId: number) {
    // Assuming you have a service to fetch user data by ID
    this.userService.getUserById(userId).subscribe((userData) => {
      // Set the retrieved user data to the 'user' property
      this.user = userData;
      console.log(this.user.name);
      // Show the edit modal
    });
  }

//bech ne5dem el image fi west el updet actifty

  // update user
  updateUser(): void {
    // Assuming you have a userService method for updating users
    this.userService.editUser(this.user).subscribe(
      (updatedUser) => {
        // Handle the case where the update was successful
        console.log("User updated:", updatedUser);
        // Close the modal

        // Reload the page
        window.location.reload();
        this.notificationService.showSuccessMessage(updatedUser.message);

      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error) {
            // Convert the error object to a string and display it
            this.notificationService.showErrorMessage(JSON.stringify(error.error));
          } else {
            // Handle other errors
            this.notificationService.showErrorMessage('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
          }
        }
      }
    );
  }


  // Method to delete a User
  deleteUser(id: number): void {
    if (confirm('est ce que vous sur pour supprimer ce Adherent ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Handle successful deletion, maybe reload the data
          this.getUsers();
        },
        (error) => {
          console.error('Error deleting Fournisseur:', error);
        }
      );
    }
  }


}