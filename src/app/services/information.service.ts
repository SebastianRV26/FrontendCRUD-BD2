import { Injectable } from '@angular/core';
import { TableData } from '../models/TableData';
import { MatTableDataSource } from '@angular/material/table';

import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SchemaResponse } from '../models/SchemaResponse';
import { TableResponse } from '../models/TableResponse';
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
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2EiLCJwYXNzd29yZCI6IjEyMzQ1Iiwic2VydmVyIjoibG9jYWxob3N0IiwiZGF0YWJhc2UiOiJEQjEiLCJkcml2ZXIiOiJtc3NxbCJ9.7iwyifaJkDE-VbKZwiV393EsxgXFPLpWV8ioNEPUZZY"; //this._authService.getToken();
    const HTTPheaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this._http.get<SchemaResponse>(`${environment.API}getSchemas`, { headers: HTTPheaders, observe: 'response' }).subscribe(
      (response) => {
        if(response.status == 200){
          console.log("Entró")
          return response.body.data
        }
      },
      (err: HttpErrorResponse) => {
        this.resolveError(err);
      }
    )
  }

  getTables(){
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2EiLCJwYXNzd29yZCI6IjEyMzQ1Iiwic2VydmVyIjoibG9jYWxob3N0IiwiZGF0YWJhc2UiOiJEQjEiLCJkcml2ZXIiOiJtc3NxbCJ9.7iwyifaJkDE-VbKZwiV393EsxgXFPLpWV8ioNEPUZZY"; //this._authService.getToken();
    const HTTPheaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this._http.get<TableResponse>(`${environment.API}getTables`, { headers: HTTPheaders, observe: 'response' }).subscribe(
      (response) => {
        if(response.status == 200){
          console.log("Entró")
          return response.body.data
        }
      },
      (err: HttpErrorResponse) => {
        this.resolveError(err);
      }
    )
  }

  resolveError(err: HttpErrorResponse) {
    //err.error.mensaje != undefined ? this._alertService.showAlert(2, err.error.mensaje) : this._alertService.showAlert(2, 'Imposible conectarse con el servidor')
    console.log("Error "+err.error.mensaje)
  }

}
