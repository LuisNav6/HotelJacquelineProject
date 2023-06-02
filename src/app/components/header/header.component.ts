import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isTransparent: boolean = true;
  
  constructor(private auth:UserService, private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verificar la posición del scroll
    if (window.pageYOffset > 50) {
      // Si la posición del scroll es mayor que 50px, actualizar la propiedad 'isTransparent' a false
      this.isTransparent = false;
    } else {
      // Si la posición del scroll es menor que 50px, actualizar la propiedad 'isTransparent' a true
      this.isTransparent = true;
    }
  }

  logOut(){
    this.auth.logOut()
    .then(() =>{
      this.router.navigate(['/login']);
    }).catch(e => console.log(e));
  }
}
