import { Component, OnInit } from '@angular/core';
import {Agencia} from '../../../model/agencia';
import {AgenciaService} from '../../service/agencia.service';

@Component({
  selector: 'app-agencia',
  templateUrl: './agencia.component.html',
  styleUrls: ['./agencia.component.css']
})
export class AgenciaComponent implements OnInit {

  agencias: Agencia[];

  constructor(private agenciaService: AgenciaService) { }

  ngOnInit() {
    this.agenciaService.getAll().subscribe(
      (result: any) => {
        console.log(result);
      },
      error => {
        console.log('Erro agencia component:' + JSON.stringify(error));
      }
    );
  }

}
