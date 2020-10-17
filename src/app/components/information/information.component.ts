import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../../services/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformationService } from '../../services/information.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSchemeComponent } from '../dialog-scheme/dialog-scheme.component';

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
  scheme = "";
  extraScheme = "";

  constructor(private tableService: TableService, private snackBar: MatSnackBar, 
    private _informationService: InformationService, public dialog: MatDialog) { }

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

  }

  getSchemas(newElement:string){
    this._informationService.getSchemas()
      .subscribe(res => {
        this.schemes = res.body.data;
        if (newElement!=""){
          this.schemes.push({"TABLE_SCHEMA":newElement})//(this.extraScheme+"")
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
      console.log('The dialog was closed');
      if (result != undefined) {
        //this.openDialogConfirmationAdd(result); //llama al otro dialog
        this.extraScheme = result;
        this.getSchemas(this.extraScheme)
      }
    });
  }
  

}

