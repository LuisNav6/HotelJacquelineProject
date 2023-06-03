import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() userEmail: string;
  
  isTransparent: boolean = true;
  isRegularUser: boolean = false;
  showMenu: boolean = false;
  userEmailHeader: string = '';

  constructor(private auth: UserService, private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.isTransparent = false;
    } else {
      this.isTransparent = true;
    }
  }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.isRegularUser = true;
        console.log(loggedIn + ' Usuario logeado');
      } else {
        this.isRegularUser = false;
        console.log(loggedIn + ' Null');
        if (this.isRegularUser) {
          this.router.navigate(['/login']);
        }
      }
    });
    this.auth.userEmail.subscribe((userEmail) => {
      this.userEmailHeader = userEmail;
      console.log(this.userEmailHeader);
    });
  }

  getMenuContainerWidth(): number {
    // Definir un ancho mínimo para el contenedor del menú
    const minWidth = 150;
    // Obtener la longitud del correo electrónico
    const emailLength = this.userEmailHeader ? this.userEmailHeader.length : 0;
    // Calcular el ancho basado en la longitud del correo electrónico
    const width = minWidth + emailLength * 10; // Puedes ajustar el valor multiplicativo según tus necesidades
    // Retornar el ancho calculado
    return width;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logOut() {
    this.auth
      .logOut()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((e) => console.log(e));
  }
}
