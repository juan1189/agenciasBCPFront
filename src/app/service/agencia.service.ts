import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {UserAuthenticate} from '../../model/userAuthenticate';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  baseUrl = 'http://localhost:8085/api/v1';
  token = '';
  user: UserAuthenticate;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/agencias/listar', this.jwt());

  }

  private createRequestOptions(token: string) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
    const options = { headers };
    return options;
  }

  private generarToken() {
    this.user = new UserAuthenticate('admin', 'admin');

    this.authenticationService.crearToken(this.user)
      .subscribe(
        (result) => {
          this.token = result.body.jwt;
          console.log('POST call successful value returned in body',  this.token);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }

  private jwt() {
    this.generarToken();

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3NDgzNDI0NSwiaWF0IjoxNTc0Nzk4MjQ1fQ.mut402abHYCILp7e5tbTTMiD5QuHa8_fCGeN9hvLEfQ';
    console.log('Token:' + this.token)
    if (token) {
      return this.createRequestOptions(token);
    }
  }
}
