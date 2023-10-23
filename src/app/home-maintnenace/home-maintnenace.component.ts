import { Component, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from '../services/home.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home-maintnenace',
  templateUrl: './home-maintnenace.component.html',
  styleUrls: ['./home-maintnenace.component.scss']
})
export class HomeMaintnenaceComponent {

  h1: string = '';
  h2: string = '';
  p: string ='';
  image: File | null = null;


  constructor(private homeService: HomeService, private notificationService: NotificationService) { }

  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image?.name);
  }

  addHomepageImage(): void {
    const formData = new FormData();
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    // Add other convention data to the FormData object
    formData.append('h1', this.h1);
    formData.append('h2', this.h2);
    formData.append('p', this.p);

    this.homeService.addHomeData(formData).subscribe(
      (response) => {
        this.notificationService.showSuccessMessage('Acceuil page à jour avec succeé');
        this.h1 = "";
        this.h2 = "";
        this.p = '';
        this.image = null; // Reset the selected image
      },
      (error) => {
        this.notificationService.showErrorMessage(error);
      }
    );
  }

}
