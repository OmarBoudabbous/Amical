import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.scss']
})
export class EnfantComponent {
  enfantsData: any[] = []; // Initialize enfantsData as an array

  nom: string = '';
  scolarite: string = '';
  date_naissance: string = '';
  sexe: string = '';

  constructor(private userService: UserService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.fetchEnfant()
  }


  fetchEnfant(){
    this.userService.getenfantData().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.enfantsData = data; // Assign the array directly to your variable
        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  addEnfant() {
    // Vous pouvez soumettre les données des deux formulaires ici
    let bodyData = {
      'nom': this.nom,
      'scolarite': this.scolarite,
      'date_naissance': this.date_naissance,
      'sexe': this.sexe
    };

    this.userService.addEnfant(bodyData).subscribe(
      (response) => {
        console.log('Enfant created successfully:', response);
        // Handle success response here
        this.notificationService.showSuccessMessage('enfant enregister avec succeé');
        // After adding the enfant, fetch the updated data
        this.fetchEnfant()
        this.nom = '';
        this.scolarite = '';
        this.date_naissance = '';
        this.sexe = '';
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
}

