import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {UserAuthenticate} from '../../model/userAuthenticate';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  baseUrl = 'http://localhost:8090/api/v1';
  token = '';
  user: UserAuthenticate;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAll(): Observable<any> {

    generarToken()


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

    return Observable.authenticationService.crearToken(this.user)
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
    this.generarToken()
      .subscribe(result => {
        // code to execute after the response arrived comes here
      });

    const token = this.token;
    console.log("Token:" + token)
    if (token) {
      return this.createRequestOptions(token);
    }
  }
}
