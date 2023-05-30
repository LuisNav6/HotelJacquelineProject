import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { User } from './../shared/student';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public crudApi: CrudService, public toastr: ToastrService) {}

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
    if (window.confirm('Are you sure you want to delete this student?')) {
      this.crudApi.DeleteUser(user.$key);
      this.toastr.success(user.firstName + ' successfully deleted!');
    }
  }
}
