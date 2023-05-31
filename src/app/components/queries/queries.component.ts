import { Component, OnInit } from '@angular/core';
import { User } from '../shared/student';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {
  firstName: string;
  checkInDate: string;
  personsCount: number;

  usersByFullName: User[] = [];
  usersByCheckInDate: User[] = [];
  usersByPersonsCount: User[] = [];

  searchPerformedByFullName = false;
  searchPerformedByCheckInDate = false;
  searchPerformedByPersonsCount = false;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
  }

  searchUsersByFullName() {
    this.searchPerformedByFullName = true;
    this.crudService.GetUsersByFullName(this.firstName)
      .subscribe((users) => {
        this.usersByFullName = users;
      });
  }

  searchUsersByCheckInDate() {
    this.searchPerformedByCheckInDate = true;
    this.crudService.GetUsersByCheckInDate(this.checkInDate)
      .subscribe((users) => {
        this.usersByCheckInDate = users;
      });
  }

  searchUsersByPersonsCount() {
    this.searchPerformedByPersonsCount = true;
    this.crudService.GetUsersByPersonsCount(this.personsCount)
      .subscribe((users) => {
        this.usersByPersonsCount = users;
      });
  }
}
