import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          // Usuario autenticado
          if (user.email && user.email.toLowerCase() === 'admin@gmail.com') {
            // Usuario administrador, permitir acceso total
            return true;
          } else {
            // Usuario no administrador, permitir acceso solo a rutas específicas
            const allowedRoutes: string[] = ['/home']; // Agrega las rutas a las que los usuarios regulares tienen acceso
            const currentRoute: string = this.router.url;
            if (allowedRoutes.includes(currentRoute)) {
              return true;
            } else {
              console.log("Usuario Regular");
              this.router.navigate(['/home']); // Redirige a la página de inicio de sesión para usuarios regulares
              return false;
            }
          }
        } else {
          // Usuario no autenticado, redirigir a la página de inicio de sesión
          this.router.navigate(['/login']);
          this.toastr.warning('User not logged in');
          return false;
        }
      })
    );
  }
}

