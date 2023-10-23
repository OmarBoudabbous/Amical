import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // BehaviorSubject to store the etat_adhesion value
  private etatAdhesionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Actif');

  constructor() { }

  // Method to update etat_adhesion and notify subscribers
  updateEtatAdhesion(newEtatAdhesion: string) {
    this.etatAdhesionSubject.next(newEtatAdhesion);
  } 

  // Observable to subscribe to etat_adhesion changes
  getEtatAdhesion(): Observable<string> {
    return this.etatAdhesionSubject.asObservable();
  }
}
