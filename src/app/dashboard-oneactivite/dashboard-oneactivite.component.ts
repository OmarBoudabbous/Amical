import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from '../services/activite.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-dashboard-oneactivite',
  templateUrl: './dashboard-oneactivite.component.html',
  styleUrls: ['./dashboard-oneactivite.component.scss']
})
export class DashboardOneactiviteComponent {
  activity: any = {};
  fournisseur_id: any;
  fornisseur_name: string = '';
  fournisseursData: any[] = [];

  image: File | undefined;

  constructor(private fournisseurService: FournisseurService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private activiteService: ActiviteService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the id to fetch the activity details using your service
      this.activiteService.getActivityById(id).subscribe(data => {
        this.activity = data; // Update the activity property with the fetched data
        console.log('aaa', this.activity);
        this.loadFournisseur();
        this.fetchActivityById(id);


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
  loadFournisseur() {
    this.fournisseurService.getAllFournisseur().subscribe(
      (response: any) => {
        this.fournisseursData = response.fournisseurs;
        console.log(this.fournisseursData);
      },
      (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    );
  }

  updateActivty(): void {
    // Assuming you have an activiteService method for updating activities
    this.activiteService.updateActivite(this.activity.id, this.activity).subscribe(
      (updatedActivity) => {
        // Handle the case where the update was successful
        console.log("Activity updated:", updatedActivity);
        // Close the modal if applicable

        // Update the activity data in the component
        this.activity = updatedActivity; // Assuming updatedActivity is the updated data

        // Show a success message
        this.notificationService.showSuccessMessage(updatedActivity.message);
        setTimeout(() => {
          location.reload();
        }, 500); // Adjust the delay as needed
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error) {
            // Convert the error object to a string and display it
            this.notificationService.showErrorMessage(JSON.stringify(error.error));
          } else {
            // Handle other errors
            this.notificationService.showErrorMessage('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
          }
        }
      }
    );
  }

  onImageSelected(event: any) {
    this.image = event.target.files[0]; // Capture the selected file
  }

  onFormSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior

    if (this.image) {
      const activityId = this.activity.id; // Replace with your actual activity ID
      this.activiteService.updateActivityImage(activityId, this.image).subscribe(
        (response) => {
          // Show a success message
          this.notificationService.showSuccessMessage(response.message);
          
          setTimeout(() => {
            location.reload();
          }, 500); // Adjust the delay as needed
          // Close the modal or perform any other actions as needed
        },
        (error) => {
          this.notificationService.showErrorMessage(JSON.stringify(error.error));
        }
      );
    }
  }


  // Method to delete a Activity
  deleteActivty(id: number): void {
    if (confirm('est ce que vous sur pour supprimer ce Activite ?')) {
      this.activiteService.deleteActivite(id).subscribe(
        () => {
          // Handle successful deletion, maybe reload the data
          const newUrl = `/dashboard/admin/activities`; // Modify this URL as needed

          // Use Angular's Router to navigate to the new URL
          this.router.navigateByUrl(newUrl);
        },
        (error) => {
          console.error('Error deleting Fournisseur:', error);
        }
      );
    }
  }



}



