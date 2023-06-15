import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/student';
import { CrudService } from 'src/app/shared/crud.service';
import { ToastrService } from 'ngx-toastr';
import { QrService } from 'src/app/shared/qr.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-queri-user-form',
  templateUrl: './queri-user-form.component.html',
  styleUrls: ['./queri-user-form.component.scss']
})
export class QueriUserFormComponent implements OnInit {
  email: string;
  usersByEmail: User[] = [];
  searchPerformedByEmail = false;
  qrData: any;
  qrCodeUrl: string;
  constructor(private crudService: CrudService, public toastr: ToastrService, private qr: QrService) { }

  ngOnInit(): void {
  }

  searchUsersByEmail() {
    this.searchPerformedByEmail = true;
    this.crudService.GetUserByEmail(this.email)
      .subscribe((users) => {
        this.usersByEmail = users;
      });
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to delete this Reservation?')) {
      this.crudService.DeleteUserByEmail(user.email);
      console.log(user.email);
      this.toastr.success(user.firstName + ' successfully deleted!');
    }
  }

  generar(user) {
    this.qr.obtenerReserva(user.email).subscribe(
      (registros) => {
        this.qrData = JSON.stringify(registros);
        this.generarQRCode();
        this.toastr.success("QR Code of " + user.firstName + " " + user.lastName + " was successfully generated");
      },
      (error) => {
        console.error('Error al obtener los registros:', error);
      }
    );
  }

  generarQRCode() {
    const qrCodeOptions = {
      width: 200,
      height: 200,
      type: 'image/png',
    };

    QRCode.toDataURL(this.qrData, qrCodeOptions, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
      } else {
        this.qrCodeUrl = url;
      }
    });
  }
}
