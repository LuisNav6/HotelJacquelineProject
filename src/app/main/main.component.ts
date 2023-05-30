import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private auth:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logOut()
    .then(() =>{
      this.router.navigate(['/login']);
    }).catch(e => console.log(e));
  }

}
