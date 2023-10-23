import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdslService } from 'src/app/services/adsl.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { MobileinternetService } from 'src/app/services/mobileinternet.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adsl-byid',
  templateUrl: './adsl-byid.component.html',
  styleUrls: ['./adsl-byid.component.scss']
})
export class AdslByidComponent {
  
  annonceById: any = {};
  user_id: any = ''
  annonce_id: any = ''

  choixforfait: string = ''
  debit:string=''
  Adresseinstallation:string=''
  codepostal:number=0

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private adslService: AdslService, 
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



  addAdsl() {
    let bodyData = {
      "user_id": this.user_id,
      "annonce_id": this.annonce_id,
      "debit": this.debit,
      "Adresseinstallation": this.Adresseinstallation,
      "codepostal": this.codepostal,
    }

    console.log('newadsl', bodyData);

    this.adslService.addAdsl(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Demande enregistrée avec succès');
        this.router.navigate(['dashboard/adherent/adsl'])
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
