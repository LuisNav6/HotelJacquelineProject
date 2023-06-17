import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QrService {
  private baseUrl = 'https://qr-back-end.onrender.com';
  constructor(private http: HttpClient) { }

  obtenerRegistros(): Observable<any[]> {
    const url = `${this.baseUrl}/registros`;
    return this.http.get<any[]>(url);
  }

  obtenerReserva(email: string): Observable<any[]> {
    const url = `${this.baseUrl}/reserva?email=${email}`;
    return this.http.get<any[]>(url);
  }
}
