import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import 'firebase/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  OnSumbitRegister() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {
      this.toastr.error(
        'Passwords do not match.'
      );
      return;
    } else {
      this.auth.register(email, password);
    }
  }


}
