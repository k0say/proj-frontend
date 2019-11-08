import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalutiDataService } from '../services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  saluti = 'Benvenuti nel sito Alphashop';
  titolo2 = 'Seleziona gli articoli da acquistare';

  utente = '';
  messaggio = '';

  constructor(private route: ActivatedRoute, private salutiSrv: SalutiDataService) { }

  ngOnInit() {
    this.utente = this.route.snapshot.params['userid']
  }

  getSaluti() {
    console.log(this.salutiSrv.getSaluti());
    this.salutiSrv.getSaluti().subscribe(
        response => this.handleResponse(response)
      ,
      error => this.handleError(error)
    );
  }

  handleError(error)  {
    this.messaggio = error.error.messaggio;
  }

  handleResponse(response)  {
    this.messaggio = response;
    console.log(response)
  }

}
