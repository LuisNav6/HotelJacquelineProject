export interface User {
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: Number;
  checkIn: Date;
  checkOut: Date;
  persons: number;
}
