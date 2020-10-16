import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../models/TableData';
import { InformationService } from '../../services/information.service';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

const ELEMENT_DATA: TableData[] = [
  { table_name: 'Tabla 1' },
  { table_name: 'Tabla 2' },
  { table_name: 'Tabla 3' },
  { table_name: 'Tabla 4' },
  { table_name: 'Tabla 5' },
  { table_name: 'Tabla 6' },
  { table_name: 'Tabla 7' },
  { table_name: 'Tabla 8' },
  { table_name: 'Tabla 9' },
  { table_name: 'Tabla 10' },
];

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['check','name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  schemes: string[] = [
    'Esquema 1',
    'Esquema 2',
    'Esquema 3',
    'Esquema 4'
  ];

  create = false;
  read = false;
  update = false;
  delete = false;
  scheme = "";
  action = "";

  constructor(private _informationService: InformationService) { }

  ngOnInit(): void {
    //this._informationService.HTTPparams = new HttpParams();
    this.getSchemas()
  }

  search(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  clickExec() {
    console.log("Add " + this.create + " read "+this.read + " update "+this.update+" delete "+this.delete)
    console.log("Esquema: "+this.scheme)
    console.log("Acción: "+this.action)
  }

  getSchemas(){
    this._informationService.HTTPparams = new HttpParams();
    console.log("getSchemes.tsinfo")
    this.schemes = this._informationService.getSchemas()
  }
}

