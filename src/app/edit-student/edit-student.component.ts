import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})

export class EditStudentComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateUserData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetUser(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }

  get checkIn() {
    return this.editForm.get('checkIn');
  }

  get checkOut() {
    return this.editForm.get('checkOut');
  }

  get persons() {
    return this.editForm.get('persons');
  }

  updateUserData() {
    this.editForm = this.fb.group({
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
      checkIn: ['', [Validators.required, this.validateCheckInDate]],
      checkOut: ['', [Validators.required, this.validateCheckOutDate]],
      persons: ['', [Validators.required, Validators.min(1)]],
    });
  }

  validateCheckInDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate > currentDate ? null : { invalidCheckInDate: true };
  }

  validateCheckOutDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate > currentDate ? null : { invalidCheckOutDate: true };
  }

  goBack() {
    this.location.back();
  }

  updateForm() {
    this.crudApi.UpdateUser(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['firstName'].value + ' updated successfully'
    );
    this.router.navigate(['view-students']);
  }
}
