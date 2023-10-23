import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardIndexComponentComponent } from './dashboard-index-component/dashboard-index-component.component';
import { DashboardActivitiesComponentComponent } from './dashboard-activities-component/dashboard-activities-component.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { DashboardProfileComponentComponent } from './dashboard-profile-component/dashboard-profile-component.component';
import { NotificationComponent } from './notification/notification.component';
import { InputDirective } from './directive/input.directive';
import { ParentComponent } from './parent/parent.component';
import { EnfantComponent } from './enfant/enfant.component';
import { ConjointComponent } from './conjoint/conjoint.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { DashboardOneactiviteComponent } from './dashboard-oneactivite/dashboard-oneactivite.component';
import { LoadingComponent } from './loading/loading.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardAdherentComponent } from './dashboard-adherent/dashboard-adherent.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ActivityByIdAdherentComponent } from './activity-by-id-adherent/activity-by-id-adherent.component';
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
import { SportByidComponent } from './conventions/ById/sport-byid/sport-byid.component';
import { HotelBangaloByidComponent } from './conventions/ById/hotel-bangalo-byid/hotel-bangalo-byid.component';
import { BonAchatByidComponent } from './conventions/ById/bon-achat-byid/bon-achat-byid.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    DashboardIndexComponentComponent,
    DashboardActivitiesComponentComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    DashboardProfileComponentComponent,
    NotificationComponent,
    InputDirective,
    ParentComponent,
    EnfantComponent,
    ConjointComponent,
    FournisseurComponent,
    DashboardOneactiviteComponent,
    LoadingComponent,
    UserDetailsComponent,
    DashboardAdherentComponent,
    HistoriqueComponent,
    ActivityByIdAdherentComponent,
    HomeMaintnenaceComponent,
    AdslComponent,
    BonAchatComponent,
    EngagementAchatComponent,
    HotelBangaloComponent,
    SportComponent,
    AnnonceAdminComponent,
    AnnonceByIDComponent,
    MobileInternetComponent,
    AdslByidComponent,
    EngagementAchatByidComponent,
    MobileInternetByidComponent,
    SportByidComponent,
    HotelBangaloByidComponent,
    BonAchatByidComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
