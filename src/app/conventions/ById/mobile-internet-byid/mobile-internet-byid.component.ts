import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { MobileinternetService } from 'src/app/services/mobileinternet.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mobile-internet-byid',
  templateUrl: './mobile-internet-byid.component.html',
  styleUrls: ['./mobile-internet-byid.component.scss']
})
export class MobileInternetByidComponent {
  demands: any[] = []
  annonceById: any = {};
  user_id: any = ''
  annonce_id: any = ''
  choixforfait: string = ''
  formData: { selected_value: string, prix: string } = { selected_value: '', prix: '' };


  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private mobileinternetService: MobileinternetService,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.annonceService.getAnnonceById(id).subscribe((data) => {
        this.annonceById = data;
        this.annonce_id = this.annonceById.id;
        console.log('annonce_id', this.annonce_id);
        this.fetchAuthUser();
      });
    });

  }

  fetchAuthUser() {
    this.userService.getAuthUser().subscribe(
      (userData: any) => {
        if (userData && userData.id) {
          this.user_id = userData.id;
          console.log('user_id', this.user_id);
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  loadAnnonceById(conventionId: number): void {
    this.annonceService.getAnnonceById(conventionId).subscribe(
      (data) => {
        this.annonceById = data
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchannonceById(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe(
      (data) => {
        this.annonceById = data;
        // Handle the fetched mobileInternet data as needed
      },
      (error) => {
        console.error('Error fetching mobileInternet by ID:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }



  // Méthode pour mettre à jour les données
  updateFormData(event: any) {
    const selectedData = event.target.value.split('-');
    this.formData.selected_value = selectedData[0];
    this.formData.prix = selectedData[1];
  }

  addDemande() {
    let bodyData = {
      "user_id": this.user_id,
      "annonce_id": this.annonce_id,
      "choixforfait": this.choixforfait,
      "selected_value": this.formData.selected_value, // Add nom property from formData
      "prix": this.formData.prix // Add prix property from formData
    }

    console.log('demande', bodyData);

    this.mobileinternetService.addDemandeMobileInternet(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Demande enregistrée avec succès');
        this.router.navigate(['dashboard/adherent/mobileInternet'])

      },
      (error) => {
        // Handle error, e.g., show an error message
        if (error.error && error.error.error) {
          this.notificationService.showErrorMessage(error.error.error);
        } else {
          this.notificationService.showErrorMessage("An unknown error occurred.");
        }
      }
    );
  }

}
