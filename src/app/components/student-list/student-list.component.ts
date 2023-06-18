import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { User } from '../../shared/student';
import { ToastrService } from 'ngx-toastr';
import { QrService } from 'src/app/shared/qr.service';
import QRCode from 'qrcode';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  p: number = 1;
  user: User[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  qrData: any;
  qrCodeUrl: string;
  qrData2: any;
  qrCodeUrl2: string;

  constructor(public crudApi: CrudService, public toastr: ToastrService, private qr:QrService) {}

  ngOnInit() {
    this.dataState();
    this.crudApi.GetUsersList().snapshotChanges().subscribe((data) => {
      this.user = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.user.push(a as User);
      });
    });
  }

  dataState() {
    this.crudApi.GetUsersList().valueChanges().subscribe((data) => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    });
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      this.crudApi.DeleteUser(user.$key);
      this.toastr.success(user.firstName + ' successfully deleted!');
    }
  }

  generar(user){
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

  generarGeneral(){
    this.qr.obtenerRegistros().subscribe(
      (registros) => {
        this.qrData2 = JSON.stringify(registros);
        this.generarQRCode2();
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

  generarQRCode2() {
    const qrCodeOptions = {
      width: 200,
      height: 200,
      type: 'image/png',
    };

    QRCode.toDataURL(this.qrData2, qrCodeOptions, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
      } else {
        this.qrCodeUrl2 = url;
      }
    });
  }
}
