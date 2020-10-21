import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})

/**
 * Vista del código
 */
export class CodeComponent implements OnInit {

  response: HighlightResult;
  code: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Obtiene el código a mostrar
    this.dataService.currentMessage.subscribe(message => this.code = message);
  }

  onHighlight(e) {
    // Opciones al resaltar el código
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

}
