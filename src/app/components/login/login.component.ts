import { Component, Input, OnInit} from '@angular/core';
import { UserService } from '../../shared/user.service';
import 'firebase/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loggedIn: boolean;
  loginForm: FormGroup;

  constructor(private auth:UserService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  
  OnSumbitlogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.loggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        console.log(loggedIn + " bien");
      } else {
        this.loginForm.reset();
        console.log(loggedIn + " mal");
      }
    });
    
    this.auth.login(email, password);

  }
  
}

