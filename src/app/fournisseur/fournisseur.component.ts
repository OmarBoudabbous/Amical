import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../services/fournisseur.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  fournisseursData: any[] = []; // Initialize fournissuer as an array
  fournisseurById: any = {}; // Initialize with an empty object

  nom!: string;
  adresse!: string;
  telephone!: string;

  currentPage: number = 1;
  lastPage: number = 1;
  perPage: number = 3; // Adjust this to match your backend pagination settings
  totalRecords: number = 0;

  constructor(private fournisseurService: FournisseurService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.geFournisseurData(this.currentPage);
  }

  updateFournisseur(): void {

    const fournisseurData = {
      nom: this.fournisseurById.nom, // Make sure to use fournisseurById.nom
      adresse:  this.fournisseurById.adresse,
      telephone:  this.fournisseurById.telephone,
    };
  
    this.fournisseurService.updateFournisseur(this.fournisseurById.id, fournisseurData).subscribe(
      (response) => {
        console.log(response);
        this.notificationService.showSuccessMessage('fournisseur à jour avec succeé');
        this.geFournisseurData(this.currentPage);
        setTimeout(() => {
          location.reload();
        }, 500); // Adjust the delay as needed
      },
      (error) => {
        this.notificationService.showErrorMessage('Error Mise à jour Fournisseur');
        console.error('Error updating Fournisseur:', error);
      }
    );
  }

  geFournisseurData(page: number): void {
    this.fournisseurService.getFournisseurData(page).subscribe(
      (data: any) => {
        if (data.fournisseurs && Array.isArray(data.fournisseurs.data)) {
          this.fournisseursData = data.fournisseurs.data;
          this.currentPage = data.fournisseurs.current_page;
          this.lastPage = data.fournisseurs.last_page;
          this.perPage = data.fournisseurs.per_page;
          this.totalRecords = data.fournisseurs.total;
        } else {
          console.error('Data does not contain a "activites.data" array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.geFournisseurData(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.geFournisseurData(this.currentPage - 1);
    }
  }


  addFournisseur() {
    // Vous pouvez soumettre les données des deux formulaires ici
    let bodyData = {
      'nom': this.nom,
      'adresse': this.adresse,
      'telephone': this.telephone,

    };
    this.fournisseurService.addFournisseur(bodyData).subscribe(
      (response) => {
        console.log('Fournisseur created successfully:', response);
        // Handle success response here
        this.notificationService.showSuccessMessage('fournisseur enregister avec succeé');

        // After adding the activite, fetch the updated data
        this.geFournisseurData(this.currentPage);

        this.nom = '';
        this.adresse = '';
        this.telephone = '';
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

  // Method to delete a Activite
  deleteFournisseur(id: number): void {
    if (confirm('Are you sure you want to delete this Fournisseur?')) {
      this.fournisseurService.deleteFournisseur(id).subscribe(
        () => {
          // Handle successful deletion, maybe reload the data
          this.geFournisseurData(this.currentPage);
        },
        (error) => {
          console.error('Error deleting Fournisseur:', error);
        }
      );
    }
  }

  
  
  
  
loadFrounisseurByID(fournisseurId: number): void {    
  this.fournisseurService.getFournisseurByID(fournisseurId).subscribe(
    (data) => {
      this.fournisseurById = data;
      console.log('fournisseurById:', this.fournisseurById);
    },
    (error) => {
      console.error(error);
    }
  );
}

}
