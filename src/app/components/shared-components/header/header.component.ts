import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isTransparent: boolean = true;

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
}
