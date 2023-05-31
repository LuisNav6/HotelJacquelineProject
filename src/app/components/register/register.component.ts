import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import 'firebase/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm : FormGroup;

  constructor(private auth:UserService, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  OnSumbitRegister(){
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.auth.register(email, password);
  }

}
