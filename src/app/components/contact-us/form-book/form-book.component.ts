import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss']
})
export class FormBookComponent implements OnInit{
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  contactForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Enviar el formulario a través de una petición HTTP
    } else {
      console.log("Formulario inválido");
    }
  }
}
