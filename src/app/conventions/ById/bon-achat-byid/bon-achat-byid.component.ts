import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdslService } from 'src/app/services/adsl.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { BonAchatService } from 'src/app/services/bon-achat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bon-achat-byid',
  templateUrl: './bon-achat-byid.component.html',
  styleUrls: ['./bon-achat-byid.component.scss']
})
export class BonAchatByidComponent {
  annonceById: any = {};
  user_id: any = ''
  annonce_id: any = ''

  montant: string = ''


  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private bonAchatService: BonAchatService, 
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



  addBonAchat() {
    let bodyData = {
      "user_id": this.user_id,
      "annonce_id": this.annonce_id,
      "montant": this.montant,
    }

    console.log('newadsl', bodyData);

    this.bonAchatService.addBonAchat(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Demande enregistrée avec succès');
        this.router.navigate(['dashboard/adherent/bonAchat'])
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