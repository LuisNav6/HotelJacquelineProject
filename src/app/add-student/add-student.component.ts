import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.crudApi.GetUsersList();
    this.uForm();
  }

  uForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      persons: ['', [Validators.required, Validators.min(1)]],
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // January is 0
    const year = today.getFullYear();

    const dayString = day < 10 ? '0' + day : day.toString();
    const monthString = month < 10 ? '0' + month : month.toString();

    return `${year}-${monthString}-${dayString}`;
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobileNumber() {
    return this.userForm.get('mobileNumber');
  }

  get checkIn() {
    return this.userForm.get('checkIn');
  }

  get checkOut() {
    return this.userForm.get('checkOut');
  }

  get persons() {
    return this.userForm.get('persons');
  }

  ResetForm() {
    this.userForm.reset();
  }

  submitUserData() {
    this.crudApi.AddUser(this.userForm.value);
    this.toastr.success(
      this.userForm.controls['firstName'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
