import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { QueriesComponent } from './queries/queries.component';
import { LoginComponent } from './login/login.component';
import { LoginSmsComponent } from './login-sms/login-sms.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register-student',
    component: AddStudentComponent,canActivate: [AuthGuard]
  },
  {
    path: 'view-students',
    component: StudentListComponent,canActivate: [AuthGuard]
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent,canActivate: [AuthGuard]
  },
  {
    path: 'queries',
    component: QueriesComponent,canActivate: [AuthGuard]
  },
  {
    path: 'login-sms', component: LoginSmsComponent,
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
