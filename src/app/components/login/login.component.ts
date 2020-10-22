import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  seleccionada: String;
  puerto: String;

  constructor(private router: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit(): void {
    // Valida los campos requeridos
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      server: ['', Validators.required],
      database: ['', Validators.required],
      port: ['', Validators.required],
      driver: ['', Validators.required]
    });
  }

  login() {
    this.loginForm.value.driver = this.seleccionada;
    var split = this.loginForm.value.server.split(":", 2);

    // Si el driver es mssql se ponen el puerto y la direccion juntas
    if (this.loginForm.value.driver === "mssql") {
      this.loginForm.removeControl("port");
      this.loginForm.value.driver = this.seleccionada;
      this.loginForm.value.server = this.loginForm.value.server;
    } else {
      // Si es mssql se hace separado
      if (split[1] == undefined) {
        this._snackBar.open(" Debe de colocar el puerto junto al server ", 'Cerrar', {
          duration: 2000,
        });
      } else {
        this.loginForm.value.server = split[0];
        this.loginForm.value.port = split[1];
      }
    }

    // Se hace el login
    this.authService.login(this.loginForm.value)
      .subscribe(res => {
        this.authService.setSession(res.body);
        this.router.navigateByUrl('/information');
      }, error => {
        switch (error.status) {
          // Manejo de errores
          case 1: case 2:
            this._snackBar.open(" Credenciales Incorrectos ", 'Cerrar', {
              duration: 2000,
            });
            break;
          case 3:
            this._snackBar.open(" Driver desconocido ", 'Cerrar', {
              duration: 2000,
            });
            break;
          default:
            this._snackBar.open(" Fallo de conexión ", 'Cerrar', {
              duration: 2000,
            });
        }
      });
  }

  changeRatio(event: MatSelectChange) {
    this.seleccionada = event.value;
  }
}
