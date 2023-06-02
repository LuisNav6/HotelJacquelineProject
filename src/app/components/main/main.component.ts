import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() loggedOut: boolean;

  isAdminLoggedIn: boolean = false;
  isRegularUser: boolean = false;

  specialRoutes: string[] = ['/login', '/register', '/login-sms', '/register-student', '/view-students', '/edit-student', '/queries']; // Agrega las rutas especiales donde no deseas mostrar el encabezado y el pie de página

  constructor(private auth: UserService, private router: Router, private afAuth: AngularFireAuth) { }

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

      this.auth.loggedIn.subscribe(loggedIn => {
        if (loggedIn) {
          this.isRegularUser = true;
          console.log(loggedIn + "Usuario logeado");
        } else {
          this.isRegularUser = false;
          console.log(loggedIn + "Null");
          if (this.isRegularUser) {
            this.router.navigate(['/login']);
          }
        }
      });

      this.auth.loggedOut.subscribe(loggedOut => {
        if (loggedOut) {
          this.isRegularUser = false;
          console.log(loggedOut + "Usuario logOut")
        }
      });
    });
  }

  isSpecialRoute(): boolean {
    const currentRoute: string = this.router.url;
    return this.specialRoutes.includes(currentRoute);
  }
}
