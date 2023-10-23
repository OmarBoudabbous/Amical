import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard-profile-component',
  templateUrl: './dashboard-profile-component.component.html',
  styleUrls: ['./dashboard-profile-component.component.scss']
})
export class DashboardProfileComponentComponent implements OnInit {

  name: any = ''
  prenom: any = ''
  affectation: any = ''
  gsm: any = ''
  matricule: any = ''
  date_naissance: any = ''
  date_adhesion: any = ''
  etat_civil: any = ''
  fonction: any = ''
  adresse: any = ''
  cin: any = ''
  cotaannuellesubvention: any = ''


  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    // Call the AuthService to fetch user data
    this.userService.getAuthUser().subscribe(
      (userData: any) => {

        if (userData && userData.name) {
          this.name = userData.name;
          this.prenom = userData.prenom;
          this.adresse = userData.adresse;
          this.gsm = userData.gsm;
          this.affectation = userData.affectation;
          this.matricule = userData.matricule;
          this.fonction = userData.fonction;
          this.etat_civil = userData.etat_civil;
          this.date_adhesion = userData.date_adhesion;
          this.date_naissance = userData.date_naissance;
          this.cin = userData.cin;
          this.cotaannuellesubvention = userData.cotaannuellesubvention;
        }

      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    );
  }
}
