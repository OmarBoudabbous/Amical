import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { EngagmentAchatService } from 'src/app/services/engagment-achat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-engagement-achat-byid',
  templateUrl: './engagement-achat-byid.component.html',
  styleUrls: ['./engagement-achat-byid.component.scss']
})
export class EngagementAchatByidComponent {

  annonceById: any = {};
  user_id: any = ''
  annonce_id: any = ''

  article: string = ''; // Name of the article
  prix_article: number = 0; // Price of the article
  prix_finale: number = 0; // Final price
  avance: number = 0; // Advance payment
  nbrmois: number = 0; // Default to 4 months
  deduction_mensuelle: number = 0; // Monthly deduction


  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private engagmentAchatService: EngagmentAchatService,
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

  calculateDeduction() {
    this.prix_finale = this.prix_article;
    this.deduction_mensuelle = (this.prix_article - this.avance) / this.nbrmois;
  }

  addEngagementAchat() {
    const bodyData = {
      user_id: this.user_id,
      annonce_id: this.annonce_id,
      article: this.article,
      prix_article: this.prix_article,
      prix_finale: this.prix_article,
      avance: this.avance,
      nbrmois: this.nbrmois,
      deduction_mensuelle: this.deduction_mensuelle,
    };

    console.log('demande', bodyData);

    this.engagmentAchatService.addEngamentAchat(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Demande enregistrée avec succès');
        this.router.navigate(['dashboard/adherent/engagementAchat'])

      },
      (error) => {
        if (error.error && error.error.error) {
          this.notificationService.showErrorMessage(error.error.error);
        } else {
          this.notificationService.showErrorMessage(error.error.error);
        }
      }
    );
  }
}