import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { QueriesComponent } from './components/queries/queries.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSmsComponent } from './components/login-sms/login-sms.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { QueriUserComponent } from './components/queri-user/queri-user.component';
import { BookComponent } from './components/book/book.component';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  {path: 'queri-user', component: QueriUserComponent},
  {path: 'book', component: BookComponent},
  { path: 'about', component: AboutComponent },
  { path: 'rooms', component:  RoomsComponent},
  { path: 'explore', component: ExploreComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-student', component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: 'view-students', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'edit-student/:id', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'queries', component: QueriesComponent, canActivate: [AuthGuard] },
  { path: 'login-sms', component: LoginSmsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
