import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { BonAchatService } from 'src/app/services/bon-achat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SportService } from 'src/app/services/sport.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sport-byid',
  templateUrl: './sport-byid.component.html',
  styleUrls: ['./sport-byid.component.scss']
})
export class SportByidComponent {
  enfantData: any = {}; // Create an object to store the child data
  annonceById: any = {};
  user_id: any = ''
  annonce_id: any = ''
  

  montant: string = ''
  type_abonnement: string = ''
  niveau_etude: string = ''
  code_inscription: string = ''
  enfant_id: any = ''


  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private sportService: SportService, 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.annonceService.getAnnonceById(id).subscribe((data) => {
        this.annonceById = data;
        this.annonce_id = this.annonceById.id;
        console.log('annonce_id', this.annonce_id);
        this.fetchAuthUser()
        this.loadEnfant()
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

  loadEnfant() {
    this.userService.getenfantData().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.enfantData = data; // Assign the array directly to your variable
        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
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



  addInscriptionSport() {
    let bodyData = {
      "user_id": this.user_id,
      "annonce_id": this.annonce_id,
      "enfant_id": this.enfant_id,
      "code_inscription": this.code_inscription,
      "niveau_etude": this.niveau_etude,
      "type_abonnement": this.type_abonnement,
    }

    console.log('newSport', bodyData);

    this.sportService.addInscriptionSport(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Demande enregistrée avec succès');
        this.router.navigate(['dashboard/adherent/sport'])
      },
      (error) => {
        console.error('Error creating annonce:', error);
        if (error.error.errors) {
          const errorMessages = Object.values(error.error.errors).flatMap((errorArray) => errorArray);
          const errorMessage = errorMessages.join(' ');
          // Display the error message as a single string
          this.notificationService.showErrorMessage(errorMessage);
        } else {
          this.notificationService.showErrorMessage(error.error.error);
        }
      }
    );
  }
}