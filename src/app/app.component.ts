import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularfirebase-student-app';
  isAdminLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      // Verificar si el usuario está autenticado y si tiene el correo electrónico de administrador
      if (user && user.email && user.email.toLowerCase() === 'admin@gmail.com') {
        this.isAdminLoggedIn = true;
        console.log(this.isAdminLoggedIn);
        console.log("I'm admin");
      } else {
        this.isAdminLoggedIn = false;
        console.log("I'm not admin");
      }
    });
  }
}
