import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  seleccionada: String;
  puerto:String;

  constructor(private router: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      server: ['', Validators.required],
      db_name: ['', Validators.required],
      port: ['', Validators.required],
      driver: ['', Validators.required]
    });
  }

  login() {
    this.loginForm.value.driver = this.seleccionada;
    var split = this.loginForm.value.server.split(":",2);
    if(this.loginForm.value.driver === "mssql"){
      this.loginForm.removeControl("port");
      this.loginForm.value.driver = this.seleccionada;
      this.loginForm.value.server = split[0];
      this.router.navigateByUrl('/information');
    }else{
      if(split[1] == undefined){
        this._snackBar.open(" Debe de colocar el puerto junto al server ", 'Cerrar', {
          duration: 2000,
        });
      }else{
        this.loginForm.value.server = split[0];
        this.loginForm.value.port = split[1];
        this.router.navigateByUrl('/information');
      }
    }
    console.log(this.loginForm.value);
  }

  changeRatio(event: MatSelectChange) {
    this.seleccionada = event.value;
    console.log(this.seleccionada);
  }
}
