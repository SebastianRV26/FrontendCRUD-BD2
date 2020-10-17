import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../models/TableData'
import { TableService } from '../../services/table.service';
import { CrudService } from '../../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'create_check', 'read_check', 'update_check', 'delete_check'];
  dataSource = new MatTableDataSource();

  constructor(private router: Router, private tableService: TableService,
    private crudService: CrudService, private dataService: DataService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables({})
      .subscribe(res => {
        this.dataSource.data = res.body.data;
      }, error => {
        this.snackBar.open(" Error de conexión ", 'Cerrar', {
          duration: 2000,
        });
      });
  }

  search(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  checkAllColumn(ev, column) {
    this.dataSource.data.forEach(x => x[column] = ev.checked)
  }

  isAllCheckedColumn(column) {
    return this.dataSource.data.every(p => p[column]);
  }

  clickExec() {
    let request = {
      schema: "dbo",
      execute: false,
      tables: {}
    }
    this.dataSource.data.forEach((data: TableData) => {
      request.tables[data.name] = {
        create: data.create ? true : false,
        read: data.read ? true : false,
        update: data.update ? true : false,
        delete: data.delete ? true : false
      };
    });

    this.crudService.generateCrud(request)
      .subscribe(res => {
        this.dataService.changeMessage(res.body.data);
        this.router.navigateByUrl('/code');
      }, error => {
        this.snackBar.open(" Error de conexión ", 'Cerrar', {
          duration: 2000,
        });
      });
  }

}

