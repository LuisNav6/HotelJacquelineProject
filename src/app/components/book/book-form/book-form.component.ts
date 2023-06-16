import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/crud.service';
import { User } from 'src/app/shared/student';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  public userForm: FormGroup;
  public selectedRoomImage: string;
  existingReservations: User[];
  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    public crudApi: CrudService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.uForm();
    this.crudApi.GetReservations()
      .pipe(
        map(reservations => reservations as User[]) // Conversión de tipo
      )
      .subscribe(reservations => {
        this.existingReservations = reservations;
      });
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
      roomType: ['', Validators.required]
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
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

  get roomType() {
    return this.userForm.get('roomType');
  }

  ResetForm() {
    this.userForm.reset();
  }

  submitUserData() {
    if (this.userForm.valid) {
      const checkInFormulario = new Date(this.userForm.get('checkIn').value);
      const checkOutFormulario = new Date(this.userForm.get('checkOut').value);
      const TAMANOBD = this.existingReservations.length;
  
      let band = 0;
      let roomTypeCounts = {
        double: 0,
        twin: 0,
        family: 0,
      };
  
      for (let i = 0; i < TAMANOBD; i++) {
        const checkInBaseDatos = new Date(this.existingReservations[i].checkIn);
        const checkOutBaseDatos = new Date(this.existingReservations[i].checkOut);
        const roomType = this.existingReservations[i].roomType;
  
        if (
          checkInFormulario >= checkInBaseDatos &&
          checkInFormulario < checkOutBaseDatos
        ) {
          band = 3;
          break;
        } else if (
          checkOutFormulario > checkInBaseDatos &&
          checkOutFormulario <= checkOutBaseDatos
        ) {
          band = 4;
          break;
        } else if (
          checkInFormulario < checkInBaseDatos &&
          checkOutFormulario > checkOutBaseDatos
        ) {
          band = 5;
          break;
        } else if (checkInFormulario > checkOutFormulario) {
          band = 1;
          break;
        }
  
        // Actualizar el conteo de reservaciones por tipo de habitación
        if (roomTypeCounts[roomType]) {
          roomTypeCounts[roomType]++;
        } else {
          roomTypeCounts[roomType] = 1;
        }
      }
  
      const selectedRoomType = this.userForm.get('roomType').value;
      const maxReservations = {
        double: 10,
        twin: 7,
        family: 4,
      };
  
      if (roomTypeCounts[selectedRoomType] >= maxReservations[selectedRoomType]) {
        band = 6;
      }
  
      switch (band) {
        case 0:
          // Si no hay conflictos de fechas ni límite de reservaciones, guarda los datos de la reservación en la base de datos
          this.crudApi.AddUser(this.userForm.value);
          this.toastr.success(
            this.userForm.controls['firstName'].value + ' successfully added!'
          );
          this.ResetForm();
          break;
          case 1:
            this.toastr.error('Invalid date combination');
            break;
          case 3:
            this.toastr.error('Entry date already booked');
            break;
          case 4:
            this.toastr.error('Exit date already booked');
            break;
          case 5:
            this.toastr.error('There is a reservation within your date range');
            break;
          case 6:
            this.toastr.error(
              'All ' + selectedRoomType + ' rooms are occupied'
            );
            break;
      }
    } else {
      this.toastr.error('Please fill in all the required fields');
    }
  }
  

  updateRoomImage() {
    const roomType = this.userForm.get('roomType').value;
    switch (roomType) {
      case 'double':
        this.selectedRoomImage = 'assets/imgs/rooms/room1.jpg';
        break;
      case 'twin':
        this.selectedRoomImage = 'assets/imgs/rooms/room4.jpg';
        break;
      case 'family':
        this.selectedRoomImage = 'assets/imgs/rooms/room6.jpg';
        break;
      default:
        this.selectedRoomImage = null;
        break;
    }
  }
}
