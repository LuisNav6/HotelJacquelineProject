import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private auth:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logOut()
    .then(() =>{
      this.router.navigate(['/home']);
    }).catch(e => console.log(e));
  }
}
