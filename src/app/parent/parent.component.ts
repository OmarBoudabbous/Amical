import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  nom_pere: any = ''
  prenom_pere: any = ''
  nom_mere: any = ''
  prenom_mere: any = ''
  date_naissance_pere: any = ''
  date_naissance_mere: any = ''

  hasData: boolean =false



  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    // Call the AuthService to fetch user data
    this.fetchParent()
   
  }

  fetchParent (){
    this.userService.getParentData().subscribe(
      (parentData: any) => {
        if (parentData) {
          this.nom_mere = parentData.nom_mere;
          this.prenom_mere = parentData.prenom_mere;
          this.nom_pere = parentData.nom_pere;
          this.prenom_pere = parentData.prenom_pere;
          this.date_naissance_pere = parentData.date_naissance_pere;
          this.date_naissance_mere = parentData.date_naissance_mere;
          this.hasData= true
        }
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    );
  }

  saveparent() {
    let bodyData = {
      "nom_pere": this.nom_pere,
      "prenom_pere": this.prenom_pere,
      "nom_mere": this.nom_mere,
      "prenom_mere": this.prenom_mere,
      "date_naissance_pere": this.date_naissance_pere, // Will contain the selected date as a string in ISO format
      "date_naissance_mere": this.date_naissance_mere, // Will contain the selected date as a string in ISO format
    }
    console.log(bodyData);

    this.userService.addParent(bodyData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('parent enregister avec succeé');
        // Handle success response here
      },
      (error) => {
        // Handle error, e.g., show an error message
        if (error.error && error.error.message) {
          this.notificationService.showErrorMessage(error.error.message);
        } else {
          this.notificationService.showErrorMessage('An error occurred during login.');
        }
      }
    );
  }


}
