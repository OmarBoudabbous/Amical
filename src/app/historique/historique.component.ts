import { Component, OnInit, } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  activtiesReservations: any[] = [];
  conventionsReservations: any[] = [];

  activtiesPagination: any = {};
  conventionsPagination: any = {};

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations('activties');
    this.loadReservations('conventions');
  }

  loadReservations(type: string, page: number = 1): void {
    this.reservationService.getallReservation(type, page).subscribe(
      (data: any) => {
        if (type === 'activties') {
          this.activtiesReservations = data.activties;
          this.activtiesPagination = data.activties;
          
          // Log the titles for activties
          this.activtiesReservations.forEach((reservation, index) => {
            console.log(`Activtie ${index + 1} Title: ${reservation.activites?.titre}`);
          });
        } else if (type === 'conventions') {
          this.conventionsReservations = data.conventions;
          this.conventionsPagination = data.conventions;
          
          // Log the titles for conventions
          this.conventionsReservations.forEach((reservation, index) => {
            console.log(`Convention ${index + 1} Title: ${reservation.conventions?.titre}`);
          });
        }
      }
    );
  }
  


}