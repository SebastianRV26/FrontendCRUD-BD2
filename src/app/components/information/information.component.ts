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
/**
 * Muestra la lista de tablas
 */
export class InformationComponent implements OnInit {
  // Columnas a mostrar
  displayedColumns: string[] = ['name', 'create_check', 'read_check', 'update_check', 'delete_check'];
  dataSource = new MatTableDataSource();

  schemes: any[]; // lista de esquemas
  action = "";
  scheme: SchemaData;
  extraScheme = "";

  constructor(private router: Router, private tableService: TableService,
    private crudService: CrudService, private dataService: DataService,
    private snackBar: MatSnackBar, private _informationService: InformationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // Se carga la tabla y los esquemas
    this.loadTables();
    this.getSchemas("");
  }

  /**
   * Ejecuta el request para cargar los datos de las tablas
   */
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

  /**
   * Responde al evento de busqueda y filtra los datos de la tabla
   */
  search(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  /**
   * Se ejecuta cuando se hace click en el seleccionar todas las columnas
   */
  checkAllColumn(ev, column) {
    this.dataSource.data.forEach(x => x[column] = ev.checked)
  }

  /**
   * Verifica si todas la columnas están marcadas
   */
  isAllCheckedColumn(column) {
    return this.dataSource.data.every(p => p[column]);
  }

  /**
   * Ejecuta la solicitud de generar código al servidor
   */
  clickExec() {
    let schema = "dbo";
    if (this.scheme != undefined) {
      schema = this.scheme.table_schema;
    }
    let request = {
      schema: schema,
      createSchema: schema == this.extraScheme,
      execute: this.action == "option2",
      tables: {}
    }
    // Recorre la lista de tablas y las guarda en la solicitud
    this.dataSource.data.forEach((data: TableData) => {
      request.tables[data.name] = {
        create: data.create ? true : false,
        read: data.read ? true : false,
        update: data.update ? true : false,
        delete: data.delete ? true : false
      };
    });

    // Ejecuta el request
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

  /**
   * Ejecuta el request para cargar los datos de los esquemas
   */
  getSchemas(newElement: string) {
    this._informationService.getSchemas()
      .subscribe(res => {
        this.schemes = res.body.data;
        if (newElement != "") {
          this.schemes.push({ table_schema: newElement })
        }
      }, error => {
        this.snackBar.open(" Error de conexión ", 'Cerrar', {
          duration: 2000,
        });
      });

  }

  /**
   * Accion de añadir nuevo esquema
   */
  clickAdd() {
    const dialogRef = this.dialog.open(DialogSchemeComponent, {
      width: '30%',
      height: '45%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.extraScheme = result;
        this.getSchemas(this.extraScheme)
      }
    });
  }


}

