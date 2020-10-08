import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public conexionCompleta: boolean=true;
  public menus:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarEstado(): void{
    this.conexionCompleta = false;
    this.menus = true
  }
}
