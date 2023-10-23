import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-mobile-internet',
  templateUrl: './mobile-internet.component.html',
  styleUrls: ['./mobile-internet.component.scss']
})
export class MobileInternetComponent {
  annonces: any[] = []; // Declare an array to store the fetched announcements
  annonceById: any = {};
  currentPage: number = 1;
  lastPage: number = 1;
  perPage: number = 3;
  totalRecords: number = 0;
  currentActivityIndex: number = 1;

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit() {
    this.loadAnnonceData(this.currentPage);
  }

  fetchAnnonceById(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe(
      (data) => {
        this.annonceById = data;
        console.log(this.annonceById);
        this.router.navigate(['dashboard/mobileIntenetById', id]);
      },
      (error) => {
        console.error('Error fetching annonce by ID:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }

  loadAnnonceData(page: number): void {
    this.annonceService.getAnnouncementsByType('mobileInternet', page).subscribe((data: any) => {
      if (data && data['tous les annonces'] && Array.isArray(data['tous les annonces'].data)) {
        this.annonces = data['tous les annonces'].data;
        this.currentPage = data['tous les annonces'].current_page;
        this.lastPage = data['tous les annonces'].last_page;
        this.perPage = data['tous les annonces'].per_page;
        this.totalRecords = data['tous les annonces'].total;
        console.log(data);

        if (this.annonces.length > 0) {
          this.currentActivityIndex = Math.min(this.currentActivityIndex, this.annonces.length - 1);
        }
      } else {
        console.error('Data does not contain a "tous les annonces.data" array:', data);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.loadAnnonceData(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadAnnonceData(this.currentPage - 1);
    }
  }
}
