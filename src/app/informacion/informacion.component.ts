import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData{
  id_persona:number;
  nombre_persona:number;
  total_desayuno: number;
  total_almuerzo:number;
  total_cena: number;
}

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  dataSource: MatTableDataSource<UserData>;

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id_persona', 'nombre_persona', 'total_almuerzo', 'total_cena', 'total_desayuno','opciones'];
}
