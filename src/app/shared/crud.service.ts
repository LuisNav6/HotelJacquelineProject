import { Injectable } from '@angular/core';
import { User } from '../shared/student';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  UsersRef: AngularFireList<any>;
  UserRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.db.object('/').valueChanges().subscribe((data) => {
      console.log(data);
    });
    this.UsersRef = this.db.list('users-list'); // Inicializa UsersRef en el constructor
  }

  // Create User
  AddUser(user: User) {
    this.UsersRef.push(user);
  }

  // Fetch Single User Object
  GetUser(id: string) {
    this.UserRef = this.db.object('users-list/' + id);
    return this.UserRef;
  }

  // Fetch Users List
  GetUsersList() {
    this.UsersRef = this.db.list('users-list');
    return this.UsersRef;
  }

  // Update User Object
  UpdateUser(user: User) {
    this.UserRef.update(user);
  }

  // Delete User Object
  DeleteUser(id: string) {
    this.UserRef = this.db.object('users-list/' + id);
    this.UserRef.remove();
  }

  // Consulta por nombre
  GetUsersByFullName(firstName: string) {
    const queryFn: QueryFn = (ref) =>
      ref.orderByChild('firstName').equalTo(firstName);
    this.UsersRef = this.db.list('users-list', queryFn);
    return this.UsersRef.valueChanges();
  }

  // Consulta por fecha de entrada
  GetUsersByCheckInDate(checkInDate: string) {
    // Crea una función de consulta para filtrar por fecha de entrada
    const queryFn: QueryFn = (ref) => ref.orderByChild('checkIn').equalTo(checkInDate);
    this.UsersRef = this.db.list('users-list', queryFn);
    return this.UsersRef.valueChanges();
  }

  // Consulta por número de personas
  GetUsersByPersonsCount(personsCount: number) {
    // Crea una función de consulta para filtrar por número de personas
    const queryFn: QueryFn = (ref) => ref.orderByChild('persons').equalTo(personsCount);
    this.UsersRef = this.db.list('users-list', queryFn);
    return this.UsersRef.valueChanges();
  }

  // Consulta por email
  GetUserByEmail(email: string) {
    const queryFn: QueryFn = (ref) =>
      ref.orderByChild('email').equalTo(email);
    this.UsersRef = this.db.list('users-list', queryFn);
    return this.UsersRef.valueChanges();
  }

  // Borrar usuario por email
  DeleteUserByEmail(email: string) {
    const users = this.UsersRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    users.subscribe((usersList) => {
      const user = usersList.find((u) => u.email === email);
      if (user) {
        this.UsersRef.remove(user.key);
      }
    });
  }

  GetReservations() {
    return this.db.list('users-list').valueChanges();
  }
}
