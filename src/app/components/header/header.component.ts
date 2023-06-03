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

  isTransparent: boolean = true;
  isRegularUser: boolean = false;
  showMenu: boolean = false;

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
        console.log(loggedIn + 'Usuario logeado');
      } else {
        this.isRegularUser = false;
        console.log(loggedIn + 'Null');
        if (this.isRegularUser) {
          this.router.navigate(['/login']);
        }
      }
    });
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