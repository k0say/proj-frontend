import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMsg = 'Spiacente la pagina cercata non è esistente!'

  constructor() { }

  ngOnInit() {
  }

}
