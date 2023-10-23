import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.scss']
})
export class AnnonceAdminComponent {
  annonceById: any = {};
  annonces: any[] = [];
  fournisseursData: any[] = [];

  currentPage: number = 1;
  lastPage: number = 1;
  perPage: number = 3;
  totalRecords: number = 0;
  currentActivityIndex: number = 1;

  titre: string = '';
  fournisseurs_id: number | null = null;
  image: File | null = null;
  type_annonce: string  = '';

  constructor(
    private annonceService: AnnonceService,
    private fournisseurService: FournisseurService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadAnnonceData(this.currentPage);
    this.loadFournisseur();
  }

  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image?.name);
  }

  addAnnonce(): void {
    const formData = new FormData();
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    formData.append('titre', this.titre);
    formData.append('type_annonce', this.type_annonce);
    formData.append('fornisseurs_id', String(this.fournisseurs_id || ''));

    this.annonceService.addAnnonce(formData).subscribe(
      (response) => {
        this.titre = '';
        this.type_annonce = '';
        this.fournisseurs_id = null;
        this.image = null;
        this.loadAnnonceData(this.currentPage);
        this.notificationService.showSuccessMessage('Annonce enregister avec succeé');
      },
      (error) => {
        console.error('Error creating annonce:', error);
        if (error.error.errors) {
          const errorMessages = Object.values(error.error.errors).flatMap((errorArray) => errorArray);
          const errorMessage = errorMessages.join(' ');
      
          // Display the error message as a single string
          this.notificationService.showErrorMessage(errorMessage);
        } else {
          this.notificationService.showErrorMessage("An unknown error occurred.");
        }
      }
    );
  }

  loadAnnonceDataById(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe(
      (data) => {
        this.annonceById = data;
        console.log('click icon',this.annonceById);
        console.log(this.annonceById.fornisseur?.nom);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateAnnonce(): void {
    const formData = new FormData();
    formData.append('titre', this.annonceById.titre);
    formData.append('type_annonce', this.annonceById.type_annonce);
    formData.append('fornisseurs_id', this.annonceById.fornisseurs_id);
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    this.annonceService.updateAnnonce(this.annonceById.id, formData).subscribe(
      (annonceUpdated) => {
        console.log('Annonce updated:', annonceUpdated);
        this.annonceById = annonceUpdated;
        this.notificationService.showSuccessMessage(annonceUpdated.message);
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error) {
            this.notificationService.showErrorMessage(JSON.stringify(error.error));
          } else {
            this.notificationService.showErrorMessage(
              'Une erreur s\'est produite lors de la mise à jour de l\'annonce.'
            );
          }
        }
      }
    );
  }

  loadAnnonceData(page: number): void {
    this.annonceService.getAnnonces(page).subscribe(
      (data: any) => {
        if (data && data['tous les annonces'] && Array.isArray(data['tous les annonces'].data)) {
          this.annonces = data['tous les annonces'].data;
          this.currentPage = data['tous les annonces'].current_page;
          this.lastPage = data['tous les annonces'].last_page;
          this.perPage = data['tous les annonces'].per_page;
          this.totalRecords = data['tous les annonces'].total;
          console.log(data);
          
          if (this.annonces.length > 0) {
            this.currentActivityIndex = Math.min(this.currentActivityIndex, this.annonces.length - 1);
          }
        } else {
          console.error('Data does not contain an "annonces.data" array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  loadFournisseur() {
    this.fournisseurService.getAllFournisseur().subscribe(
      (response: any) => {
        this.fournisseursData = response.fournisseurs;
      },
      (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.loadAnnonceData(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadAnnonceData(this.currentPage - 1);
    }
  }

  deleteAnnonce(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.annonceService.deleteAnnonce(id).subscribe(
        () => {
          this.loadAnnonceData(this.currentPage - 1);
          this.notificationService.showSuccessMessage('Supprimé avec succès');
        },
        (error) => {
          this.notificationService.showErrorMessage(error);
        }
      );
    }
  }
}