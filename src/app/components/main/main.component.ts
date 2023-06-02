import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private auth:UserService, private router: Router, private afAuth: AngularFireAuth) { }

  isAdminLoggedIn: boolean = false;
  
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
