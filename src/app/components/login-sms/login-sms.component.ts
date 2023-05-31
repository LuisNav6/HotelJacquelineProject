import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-sms',
  templateUrl: './login-sms.component.html',
  styleUrls: ['./login-sms.component.scss']
})
export class LoginSmsComponent implements OnInit {

  loginForm: FormGroup;
  showVerifyButton: boolean = false;

  constructor(private auth: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.captchaCreator();
    }, 200);
  }

  captchaCreator() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    window.recaptchaVerifier.render();
  }

  sendCode(phoneNumber: string) {
    this.auth.sendCode(phoneNumber, window.recaptchaVerifier).then(() => {
      // Después de enviar el código, muestra el botón "Verify and Sign In"
      this.showVerifyButton = true;
    });
  }

  onClickCheckSend(){
    const phoneNumber = this.loginForm.value.phoneNumber;
    this.sendCode(phoneNumber);
  }

  onClickCheck() {
    const code = this.loginForm.value.code;
    this.checkCode(code);
  }

  checkCode(code: string) {
    this.auth.checkCode(code); // Aquí debes realizar la lógica para verificar el código
  }
}