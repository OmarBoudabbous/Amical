export interface User {
    id: number
    name: string
    prenom: string
    affectation: string
    email: string
    gsm: string
    matricule: string
    cin: string
    date_naissance: string
    etat_civil: string
    fonction: string
    adresse: string
    etat_adhesion: string
    password_confirmation: string
    image: string
    cotaannuellesubvention: number | null
    
   // Add properties for enfants, reservations, pere_meres, and conjoint
   enfants: Child[]; // Array of children
   activite_reservations: Reservation[]; // Array of activite reservations
   convention_reservations: Reservation[]; // Array of convention reservations
   pere_meres: Parent; // Parent object
   conjoint: Conjoint; // Conjoint object
 }
 
 interface Child {
   id: number;
   nom: string;
   scolarite: string;
   date_naissance: string;
   sexe: string;
   user_id: number;
   created_at: string;
   updated_at: string;
 }
 
 interface Reservation {
   // Define properties for reservations
 }
 
 interface Parent {
   id: number;
   nom_pere: string;
   nom_mere: string;
   prenom_pere: string;
   prenom_mere: string;
   date_naissance_pere: string;
   date_naissance_mere: string;
   user_id: number;
   created_at: string;
   updated_at: string;
 }
 
 interface Conjoint {
   // Define properties for conjoint
 }

 // home-data.interface.ts
export interface HomeData {
  id: number;
  image: string;
  h1: string;
  h2: string;
  p: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

 