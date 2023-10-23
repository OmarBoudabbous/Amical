import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }
  cin: string = '';
  matricule: string = '';
  loading: boolean = false; // Add loading variable

  login() {
    this.loading = true;

    this.authService.login(this.cin, this.matricule).subscribe(
      (resultData: any) => {

        if (resultData.token) {
          localStorage.setItem('auth_token', resultData.token);
          const role = resultData.user.role;

          if (role === 'admin') {
            this.router.navigate(['/dashboard/admin/index']);
          } else if (role === 'adherent') {
            this.router.navigate(['/dashboard/adherent/adherent']);
          }

          this.notificationService.showSuccessMessage('Login successful');
        } else {
          this.notificationService.showErrorMessage('Mot de passe ou CIN incorrecte');
        }
        this.cin = '';
        this.matricule = '';
        this.loading = false;
      },
      (error) => {
        console.error('Login error', error);
        if (error.error && error.error.message) {
          this.notificationService.showErrorMessage(error.error.message);
        } else {
          this.notificationService.showErrorMessage('An error occurred during login.');
        }

        this.loading = false;
      }
    );
  }
}  