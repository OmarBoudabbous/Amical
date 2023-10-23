import { Component } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-activity-by-id-adherent',
  templateUrl: './activity-by-id-adherent.component.html',
  styleUrls: ['./activity-by-id-adherent.component.scss']
})
export class ActivityByIdAdherentComponent {
  activity: any = {};
  isImageEnlarged = false;

  enfants: any[] = [];
  conjointData: any = {};
  parentData: any = {};

  selectedEnfants: { [enfantId: number]: boolean } = {};
  conjointId: any;
  pereMeresId: any;

  constructor(private notificationService: NotificationService,
    private route: ActivatedRoute,
    private activiteService: ActiviteService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the id to fetch the activity details using your service
      this.activiteService.getActivityById(id).subscribe(data => {
        this.activity = data; // Update the activity property with the fetched data
        console.log('aaa', this.activity);
        this.fetchActivityById(id);
        this.fetchEnfant();
        this.fetchConjoint();
        this.fetchParent();
      });
    });
  }

  fetchActivityById(id: number): void {
    this.activiteService.getActivityById(id).subscribe(
      (data) => {
        this.activity = data;
        // Handle the fetched activity data as needed
      },
      (error) => {
        console.error('Error fetching activity by ID:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }

  makeReservation(activityId: number) {
   
    const reservationData: any = {
      activity_id: activityId,
      enfant_ids: this.selectedEnfants, // An array of selected enfant IDs
    };

    // Add conjoint_id to the reservationData if the "conjoint" checkbox is checked
    if (this.conjointId) {
      reservationData.conjoint_id = this.conjointData.id; // Replace with actual value
    }


    this.activiteService.reservation(reservationData).subscribe(
      (response) => {
        // Handle the successful reservation response here
        console.log(response);
        this.notificationService.showSuccessMessage('Réservation réussie.');
        this.fetchActivityById(activityId);
      },
      (error) => {
        // Handle any errors that occur during the reservation process
        console.error(error);
        this.notificationService.showErrorMessage(error.error.message);
      }
    );
  }



  fetchEnfant() {
    this.userService.getenfantData().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.enfants = data; // Assign the array directly to your variable
          console.log(this.enfants);

        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchConjoint() {
    this.userService.getConjointData().subscribe(
      (conjointData: any) => {
        if (conjointData) {
          this.conjointData = conjointData
          console.log('conjoint', this.conjointData);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchParent() {
    this.userService.getParentData().subscribe(
      (parentData: any) => {
        if (parentData) {
          this.parentData = parentData
          console.log('parnet', this.parentData);
        }
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    );
  }
}
