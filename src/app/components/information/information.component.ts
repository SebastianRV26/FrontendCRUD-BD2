import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../../services/table.service';
import { CrudService } from '../../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformationService } from '../../services/information.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSchemeComponent } from '../dialog-scheme/dialog-scheme.component';
import { DataService } from '../../services/data.service';
import { TableData } from '../../models/TableData';
import { SchemaData } from '../../models/SchemaData';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'create_check', 'read_check', 'update_check', 'delete_check'];
  dataSource = new MatTableDataSource();

  schemes:any[];
  action = "";
  scheme:SchemaData;
  extraScheme = "";

  constructor(private router: Router, private tableService: TableService,
    private crudService: CrudService, private dataService: DataService,
    private snackBar: MatSnackBar, private _informationService: InformationService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTables();
    this.getSchemas("");
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
    let schema = "dbo";
    if (this.scheme != undefined){
      schema = this.scheme.table_schema;
    }
    let request = {
      schema: schema,
      createSchema: schema == this.extraScheme,
      execute: this.action=="option2",
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

  getSchemas(newElement:string){
    this._informationService.getSchemas()
      .subscribe(res => {
        this.schemes = res.body.data;
        if (newElement!=""){
          this.schemes.push({table_schema:newElement})
        }
      }, error => {
        this.snackBar.open(" Error de conexión ", 'Cerrar', {
          duration: 2000,
        });
      });
    
  }

  clickAdd(){
    const dialogRef = this.dialog.open(DialogSchemeComponent, {
      width: '30%',
      height: '45%',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.extraScheme = result;
        this.getSchemas(this.extraScheme)
      }
    });
  }
  

}

