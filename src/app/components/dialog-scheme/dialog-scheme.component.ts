import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-components-dialog-scheme',
  templateUrl: './dialog-scheme.component.html',
  styleUrls: ['./dialog-scheme.component.css']
})
export class DialogSchemeComponent {

  name:string = "";

  constructor(public dialogRef: MatDialogRef<DialogSchemeComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarDato(): void{
    this.dialogRef.close(this.name);
  }
}
