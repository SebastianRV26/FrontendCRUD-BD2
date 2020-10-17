import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../../services/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'create_check', 'read_check', 'update_check', 'delete_check'];
  dataSource = new MatTableDataSource();

  schemes:string[];
  action = "";
  scheme = "";

  constructor(private tableService: TableService, private snackBar: MatSnackBar, 
    private _informationService: InformationService) { }

  ngOnInit(): void {
    this.loadTables();
    this.getSchemas()
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

  getSchemas(){
    this._informationService.getSchemas()
      .subscribe(res => {
        this.schemes = res.body.data;
      }, error => {
        this.snackBar.open(" Error de conexión ", 'Cerrar', {
          duration: 2000,
        });
      });
    
  }
}

