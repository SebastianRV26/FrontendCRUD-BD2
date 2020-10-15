import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../models/TableData'

const ELEMENT_DATA: TableData[] = [
  { name: 'Tabla 1' },
  { name: 'Tabla 2' },
  { name: 'Tabla 3' },
  { name: 'Tabla 4' },
  { name: 'Tabla 5' },
  { name: 'Tabla 6' },
  { name: 'Tabla 7' },
  { name: 'Tabla 8' },
  { name: 'Tabla 9' },
  { name: 'Tabla 10' },
];

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['check','name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  create = false;
  read = false;
  update = false;
  delete = false;
  scheme = "";
  action = "";

  constructor() { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  clickExec() {
    console.log("Add " + this.create + " read "+this.read + " update "+this.update+" delete "+this.delete)
    console.log("Esquema: "+this.scheme)
    console.log("Acción: "+this.action)
  }

}

