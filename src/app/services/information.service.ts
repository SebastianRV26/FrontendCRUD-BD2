import { Injectable } from '@angular/core';
import { TableData } from '../models/TableData';
import { MatTableDataSource } from '@angular/material/table';

import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  tables: MatTableDataSource<TableData> = new MatTableDataSource<TableData>();

  sizePages: number = 0;
  HTTPparams = new HttpParams();
  paginator_view: number;
  
  constructor(
    private _http: HttpClient
  ) { }

  getSchemas():any{
    return this._http.get(`${environment.baseUrl}/getSchemes`, { observe: "response" });
  }

  resolveError(err: HttpErrorResponse) {
    //err.error.mensaje != undefined ? this._alertService.showAlert(2, err.error.mensaje) : this._alertService.showAlert(2, 'Imposible conectarse con el servidor')
    console.log("Error "+err.error.mensaje)
  }

}
