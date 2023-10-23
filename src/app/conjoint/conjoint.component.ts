import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-conjoint',
  templateUrl: './conjoint.component.html',
  styleUrls: ['./conjoint.component.scss']
})
export class ConjointComponent {

  hasConjointData: boolean = false; // Variable pour suivre l'état des données du conjoint

  conjointData: any = {}
  nom: string = '';
  prenom: string = '';
  date_naissance: string = '';
  fonction: string = '';

  adherent_lAmical: boolean = false;

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchConjoint()
  }


  fetchConjoint() {
    this.userService.getConjointData().subscribe(
      (conjointData: any) => {
        if (conjointData) {
          this.nom = conjointData.nom;
          this.prenom = conjointData.prenom;
          this.fonction = conjointData.fonction;
          this.date_naissance = conjointData.date_naissance;
          this.adherent_lAmical = conjointData.adhèrent_lAmical; // Convert to boolean
          this.hasConjointData = true; // Marquez que les données existent
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  addConjoint() {
    // Vous pouvez soumettre les données des deux formulaires ici
    let bodyData = {
      'nom': this.nom,
      'prenom': this.prenom,
      'date_naissance': this.date_naissance,
      'fonction': this.fonction,
      'adhèrent_lAmical': this.adherent_lAmical
    };

    this.userService.addConjoint(bodyData).subscribe(
      (response) => {
        console.log('conjoint created successfully:', response);
        // Handle success response here
        this.notificationService.showSuccessMessage('conjoint enregister avec succeé');

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
