import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
  }

  name: any = ''
  prenom: any = ''
  affectation: any = ''
  gsm: any = ''
  matricule: any = ''
  cin: any = ''
  date_naissance: any = ''
  etat_civil: any = ''
  fonction: any = ''
  adresse: any = ''
  cotaannuellesubvention!: any;


  register() {

    let bodyData = {
      "name": this.name,
      "prenom": this.prenom,
      "matricule": this.matricule,
      "cin": this.cin,
      "gsm": this.gsm,
      "date_naissance": this.date_naissance, // Will contain the selected date as a string in ISO format
      "affectation": this.affectation,
      "fonction": this.fonction,
      "adresse": this.adresse,
      "etat_civil": this.etat_civil,
      "cotaannuellesubvention": this.cotaannuellesubvention,
    }

    this.http.post('http://127.0.0.1:8000/api/register', bodyData).subscribe(
      (resultData: any) => {
        // Check if the response contains a token
        if (resultData.token) {
          // Store the token in local storage
          localStorage.setItem('auth_token', resultData.token);

          // Redirect to the dashboard route
          this.router.navigate(['/dashboard/profile']); // Update '/dashboard' with your actual dashboard route
          this.notificationService.showSuccessMessage('register avec succeé');
        }
      }, (error) => {
        // Handle error, e.g., show an error message
        if (error.error && error.error.message) {
          this.notificationService.showErrorMessage(error.error.message);
        } else {
          this.notificationService.showErrorMessage('An error occurred during login.');
        }
      }
    );
  }

  save() {
    this.register();
  }
}
