import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthenticate} from '../../model/userAuthenticate';
import {AgenciaService} from './agencia.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost:8090/api/v1';

  constructor(private http: HttpClient) { }

  crearToken(usuario: UserAuthenticate): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });

    const options = {
      headers: httpHeaders
    };

    return this.http.post(this.baseUrl + '/authenticate', usuario, options);
 }
}
