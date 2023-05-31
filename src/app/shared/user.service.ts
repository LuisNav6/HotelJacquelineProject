import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastrService } from 'ngx-toastr';

declare global {
    interface Window{
        recaptchaVerifier: firebase.auth.RecaptchaVerifier;
        confirmationResult: any;
        grecaptcha:any;
    }
}

@Injectable({
    providedIn: 'root',
})

export class UserService{
    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private auth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
        auth.authState.subscribe(user =>{
            console.log(user);
        })
    }

    // Login de usuario
    login(user: string, pass: string){
        return this.auth.signInWithEmailAndPassword(user,pass)
        .then(res => {
            console.log(res);
            this.toastr.success(
                'Login successfuly'
            );
            this.loggedIn.emit(true);
            this.router.navigate(['/main']);
        }).catch(e =>{
            this.loggedIn.emit(false);
            this.toastr.error(
                'Invalid Data'
            );
            console.log(e)
        });
    }

    // Registro de usuario
    register(user: string, pass: string){
        return this.auth.createUserWithEmailAndPassword(user,pass) 
        .then(res => {
            console.log(res);
            this.toastr.success(
                'Register successfuly'
            );
            this.router.navigate(['/login']);
        }).catch(e =>{
            this.toastr.error(
                'Invalid Data'
            );
            console.log(e)
        });
    }

    // LogOut del usuario
    logOut(){
        return this.auth.signOut()
        .then(resp =>{
            this.toastr.warning(
                'LogOut successfuly'
            );
        });
    }

    // Envio del codigo
    sendCode(phoneNumber: string, appVerified: any){
        return this.auth.signInWithPhoneNumber(phoneNumber, appVerified)
        .then(resp =>{
            window.confirmationResult = resp;
            this.toastr.success(
                'Code Sended...'
            );
        }).catch(error =>{
            this.toastr.error(
                'Bad News, something went wrong...'
            );
            console.log(error);
        });
    }

    // Logeo con el codigo enviado
    checkCode(code: string){
        return window.confirmationResult.confirm(code)
        .then((res: any) =>{
            let license = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code); // Guardamos la confirmacion para enviarla a FireBase
            this.auth.signInWithCredential(license); // Logeo con el codigo
            this.toastr.success(
                'Sing In Accepted'
            );
            this.router.navigate(['/main']);
        }).catch(error =>{
            console.log(error);
            alert("Someting went wrong...");
        })
    }
}