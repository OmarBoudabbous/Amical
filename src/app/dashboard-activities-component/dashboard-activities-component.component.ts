import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { NotificationService } from '../services/notification.service';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-dashboard-activities-component',
  templateUrl: './dashboard-activities-component.component.html',
  styleUrls: ['./dashboard-activities-component.component.scss']
})
export class DashboardActivitiesComponentComponent implements OnInit {
  activitesData: any[] = [];
  fournisseursData: any[] = [];

  titre: string = '';
  description: string = '';
  type: string = '';
  placesDisponibles: string = ''
  prix: string = ''
  finActivity = ''
  subvention: string = ''
  nombreDePlace: string = ''

  fornisseur_name: string = '';
  fournisseur_id: any;
  image: File | null = null; // Initialize it with null
  
  currentPage: number = 1;
  lastPage: number = 1;
  perPage: number = 3; // Adjust this to match your backend pagination settings
  totalRecords: number = 0;
  currentActivityIndex: number = 0;
  
  isLoading: boolean = false;

  constructor(
    private activiteService: ActiviteService,
    private fournisseurService: FournisseurService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loadFournisseur();
    this.getActivitesData(this.currentPage);
  }

  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image?.name);
  }

  addActiviteImage() {
    const formData = new FormData();

    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    formData.append('titre', this.titre);
    formData.append('description', this.description);
    formData.append('type', this.type);
    formData.append('fornisseurs_id', this.fournisseur_id);
    formData.append('prix', this.prix);
    formData.append('placesDisponibles', this.nombreDePlace);
    formData.append('nombreDePlace', this.nombreDePlace);
    formData.append('finActivity', this.finActivity);
    formData.append('subvention', this.subvention);
    
    this.activiteService.addActivite(formData).subscribe(
      (response) => {
        console.log('Activite created successfully:', response);
        this.notificationService.showSuccessMessage('Activite enregistrée avec succès');

        // After adding the activite, fetch the updated data
        this.getActivitesData(this.currentPage);

        this.titre = '';
        this.description = '';
        this.type = '';
        this.fournisseur_id = 0;
        this.prix =''
        this.placesDisponibles =''
        this.nombreDePlace =''
        this.finActivity =''
        this.subvention =''
        this.image= null;
      },
      (error) => {
        // Handle error, e.g., show an error message
        if (error.error && error.error.message) {
          this.notificationService.showErrorMessage(error.error.message);
        } else {
          this.notificationService.showErrorMessage('Une erreur est survenue.');
        }
      }
    );
  }


  loadFournisseur() {
    this.fournisseurService.getAllFournisseur().subscribe(
      (response: any) => {
        this.fournisseursData = response.fournisseurs;
        console.log(this.fournisseursData);
      },
      (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    );
  }

  getActivitesData(page: number): void {
    this.activiteService.getActiviteData(page).subscribe(
      (data: any) => {
        if (data.activites && Array.isArray(data.activites.data)) {
          this.activitesData = data.activites.data;
          this.currentPage = data.activites.current_page;
          this.lastPage = data.activites.last_page;
          this.perPage = data.activites.per_page;
          this.totalRecords = data.activites.total;

          if (this.activitesData.length > 0) {
            this.currentActivityIndex = Math.min(this.currentActivityIndex, this.activitesData.length - 1);
          }
        } else {
          console.error('Data does not contain a "activites.data" array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  setActiveCarouselItem(index: number): void {
    this.currentActivityIndex = index;
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.getActivitesData(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.getActivitesData(this.currentPage - 1);
    }
  }

}
