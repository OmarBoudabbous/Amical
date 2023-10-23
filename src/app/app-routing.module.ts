import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardIndexComponentComponent } from './dashboard-index-component/dashboard-index-component.component';
import { DashboardActivitiesComponentComponent } from './dashboard-activities-component/dashboard-activities-component.component';
import { DashboardProfileComponentComponent } from './dashboard-profile-component/dashboard-profile-component.component';
import { EnfantComponent } from './enfant/enfant.component';
import { ConjointComponent } from './conjoint/conjoint.component';
import { ParentComponent } from './parent/parent.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { DashboardOneactiviteComponent } from './dashboard-oneactivite/dashboard-oneactivite.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardAdherentComponent } from './dashboard-adherent/dashboard-adherent.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ActivityByIdAdherentComponent } from './activity-by-id-adherent/activity-by-id-adherent.component';
import { AdminGuard } from './admin.guard';
import { AdherentGuard } from './adherent.guard';
import { HomeMaintnenaceComponent } from './home-maintnenace/home-maintnenace.component';
import { AdslComponent } from './conventions/adsl/adsl.component';
import { BonAchatComponent } from './conventions/bon-achat/bon-achat.component';
import { EngagementAchatComponent } from './conventions/engagement-achat/engagement-achat.component';
import { HotelBangaloComponent } from './conventions/hotel-bangalo/hotel-bangalo.component';
import { SportComponent } from './conventions/sport/sport.component';
import { AnnonceAdminComponent } from './conventions/annonce-admin/annonce-admin.component';
import { AnnonceByIDComponent } from './conventions/annonce-by-id/annonce-by-id.component';
import { MobileInternetComponent } from './conventions/mobile-internet/mobile-internet.component';
import { AdslByidComponent } from './conventions/ById/adsl-byid/adsl-byid.component';
import { EngagementAchatByidComponent } from './conventions/ById/engagement-achat-byid/engagement-achat-byid.component';
import { MobileInternetByidComponent } from './conventions/ById/mobile-internet-byid/mobile-internet-byid.component';
import { BonAchatByidComponent } from './conventions/ById/bon-achat-byid/bon-achat-byid.component';
import { SportByidComponent } from './conventions/ById/sport-byid/sport-byid.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  /*   { path: 'register', component: RegisterComponent }, */
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'activityById/:id', component: ActivityByIdAdherentComponent },
      { path: 'annonceById/:id', component: AnnonceByIDComponent },

      { path: 'adslById/:id', component: AdslByidComponent },
      { path: 'engagmentById/:id', component: EngagementAchatByidComponent },
      { path: 'mobileIntenetById/:id', component: MobileInternetByidComponent },
      { path: 'bonAchatById/:id', component: BonAchatByidComponent },
      { path: 'sportById/:id', component: SportByidComponent },

      {
        path: 'admin', canActivate: [AdminGuard], children: [
          { path: 'index', component: DashboardIndexComponentComponent },
          { path: 'activities', component: DashboardActivitiesComponentComponent },
          { path: 'activities/activities/:id', component: DashboardOneactiviteComponent },
          { path: 'fournisseur', component: FournisseurComponent },
          { path: 'users/:id', component: UserDetailsComponent },
          { path: 'home', component: HomeMaintnenaceComponent },
          { path: 'annonce', component: AnnonceAdminComponent },

        ]
      },
      {
        path: 'adherent', canActivate: [AdherentGuard], children: [
          { path: 'adherent', component: DashboardAdherentComponent },
          { path: 'enfants', component: EnfantComponent },
          { path: 'conjont', component: ConjointComponent },
          { path: 'parent', component: ParentComponent },
          { path: 'profile', component: DashboardProfileComponentComponent },
          { path: 'historique', component: HistoriqueComponent },
          { path: 'adsl', component: AdslComponent },
          { path: 'bonAchat', component: BonAchatComponent },
          { path: 'engagementAchat', component: EngagementAchatComponent },
          { path: 'HotelBangalo', component: HotelBangaloComponent },
          { path: 'sport', component: SportComponent },
          { path: 'mobileInternet', component: MobileInternetComponent },

        ]
      },
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
