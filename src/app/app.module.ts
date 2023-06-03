import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Firebase modules + environment
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { QueriesComponent } from './components/queries/queries.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSmsComponent } from './components/login-sms/login-sms.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { SectionExperienceComponent } from './components/home/section-experience/section-experience.component';
import { SectionHomeComponent } from './components/home/section-home/section-home.component';
import { SectionSatisfyComponent } from './components/home/section-satisfy/section-satisfy.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/about/contact/contact.component';
import { MapComponent } from './components/about/map/map.component';
import { MissionComponent } from './components/about/mission/mission.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomTypesComponent } from './components/rooms/room-types/room-types.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { MenuSearchComponent } from './components/restaurant/menu-search/menu-search.component';
import { RestaurantHomeComponent } from './components/restaurant/restaurant-home/restaurant-home.component';
import { HttpClientModule } from '@angular/common/http';
import { ExploreComponent } from './components/explore/explore.component';
import { ExploreHomeComponent } from './components/explore/explore-home/explore-home.component';
import { ImgExploreComponent } from './components/explore/img-explore/img-explore.component';
import { VideoExploreComponent } from './components/explore/video-explore/video-explore.component';
import { DomseguroPipe } from './components/explore/video-explore/domseguro.pipe';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormBookComponent } from './components/contact-us/form-book/form-book.component';
import { MeetOurTeamComponent } from './components/contact-us/meet-our-team/meet-our-team.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentListComponent,
    QueriesComponent,
    LoginComponent,
    LoginSmsComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    SectionExperienceComponent,
    SectionHomeComponent,
    SectionSatisfyComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AboutComponent,
    ContactComponent,
    MapComponent,
    MissionComponent,
    RoomsComponent,
    RoomTypesComponent,
    RestaurantComponent,
    MenuSearchComponent,
    RestaurantHomeComponent,
    ExploreComponent,
    ExploreHomeComponent,
    ImgExploreComponent,
    VideoExploreComponent,
    DomseguroPipe,
    ContactUsComponent,
    FormBookComponent,
    MeetOurTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    RouterModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
