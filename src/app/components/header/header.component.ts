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
  
  isAdminView: boolean = false;
  isTransparent: boolean = true;
  isRegularUser: boolean = false;
  showMenu: boolean = false;
  userEmailHeader: string = '';
  searchTerm: string = '';
  filteredItems: { label: string, link: string }[] = [];
  
  menuItems: { label: string, link: string }[] = [
    { label: 'Rooms', link: '/rooms' },
    { label: 'Explore', link: '/explore' },
    { label: 'Restaurant', link: '/restaurant' },
    { label: 'About us', link: '/about' },
    { label: 'Contact us', link: '/contact-us' }
  ];

  constructor(private auth: UserService, private router: Router) {
    this.filteredItems = this.menuItems;
  }

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
    const minWidth = 150;
    const emailLength = this.userEmailHeader ? this.userEmailHeader.length : 0;
    const width = minWidth + emailLength * 10;
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

  filterItems() {
    if (this.searchTerm.trim() === '') {
      this.filteredItems = this.menuItems;
    } else {
      this.filteredItems = this.menuItems.filter(item =>
        item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  handleEnterKey() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
  
    if (searchTermLowerCase === 'rooms') {
      this.router.navigate(['/rooms']);
    } else if (searchTermLowerCase === 'explore') {
      this.router.navigate(['/explore']);
    } else if (searchTermLowerCase === 'restaurant') {
      this.router.navigate(['/restaurant']);
    } else if (searchTermLowerCase === 'about us' || searchTermLowerCase === 'about') {
      this.router.navigate(['/about']);
    } else if (searchTermLowerCase === 'contact us' || searchTermLowerCase === 'contact') {
      this.router.navigate(['/contact-us']);
    } else if (searchTermLowerCase === 'home') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate([], { fragment: searchTermLowerCase });
    }
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
  }
}