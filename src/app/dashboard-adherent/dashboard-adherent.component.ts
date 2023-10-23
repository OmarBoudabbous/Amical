import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { FournisseurService } from '../services/fournisseur.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-adherent',
  templateUrl: './dashboard-adherent.component.html',
  styleUrls: ['./dashboard-adherent.component.scss']
})
export class DashboardAdherentComponent implements OnInit {
  activitesData: any[] = [];
  conventions: any[] = [];

  activity: any = {};
  conventionById: any = {};
  /* 
    titre: string = '';
    description: string = '';
    type: string = '';
    placesDisponibles: string = ''
    prix: string = ''
    finActivity = ''
    subvention: string = ''
    nombreDePlace: string = '' */

  currentPage: number = 1;
  lastPage: number = 1;
  perPage: number = 3; // Adjust this to match your backend pagination settings
  totalRecords: number = 0;
  currentActivityIndex: number = 0;

  currentPageConvention: number = 1;
  lastPageConvention: number = 1;
  perPageConvention: number = 3; // Adjust this to match your backend pagination settings
  totalRecordsConvention: number = 0;
  currentIndexConvention: number = 0;


  constructor(
    private activiteService: ActiviteService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActivitesData(this.currentPage);
  }

  getActivitesData(page: number): void {
    this.activiteService.getActivitesValid(page).subscribe(
      (data: any) => {
        if (data.activites && Array.isArray(data.activites.data)) {
          this.activitesData = data.activites.data;
          this.currentPage = data.activites.current_page;
          this.lastPage = data.activites.last_page;
          this.perPage = data.activites.per_page;
          this.totalRecords = data.activites.total;

          if (this.activitesData.length > 0) {
            this.currentActivityIndex = Math.min(this.currentActivityIndex, this.activitesData.length - 1);
          }
        } else {
          console.error('Data does not contain a "activites.data" array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  setActiveCarouselItem(index: number): void {
    this.currentActivityIndex = index;
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.getActivitesData(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.getActivitesData(this.currentPage - 1);
    }
  }

  fetchActivityById(id: number): void {
    this.activiteService.getActivityById(id).subscribe(
      (data) => {
        this.activity = data;
        console.log(this.activity);
        this.router.navigate(['dashboard/activityById', id]); // Replace 'activity/:id' with the actual route path

        // Handle the fetched activity data as needed
      },
      (error) => {
        console.error('Error fetching activity by ID:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }

}
