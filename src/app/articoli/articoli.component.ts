import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticoliDataService } from '../services/data/articoli-data.service';

// la dichiaro in articoli piuttosto che fare un file solo per la classe
export class Articoli {
  constructor(
    public codart: string,
    public descrizione: string,
    public um: string,
    public pzcart: number,
    public peso: number,
    public prezzo: number,
    public isactive: boolean,
    public data: Date) { }
}

export class ApiMsg {
  constructor(
    public code: string,
    public message: string
  ) {}
}

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  
  apiMsg: ApiMsg;
  messaggio: string;

  NumArt = 0;

  pagina = 1;
  righe = 10;

  filter = '';
  articolo: Articoli;
  articoli: Articoli[]

  constructor(private route: ActivatedRoute, private router: Router, private articoliService: ArticoliDataService) { }

  ngOnInit() {
    this.filter = this.route.snapshot.params['filter']

    if (this.filter != undefined) {
      this.getArticoli(this.filter);
    }
  }

  refresh() {
    this.getArticoli(this.filter);
  }

  public getArticoli(filter: string) {
    this.articoliService.getArticoliByCodeArt(filter).subscribe(
      response => {

        this.articoli = [];
        console.log('Ricerchiamo articoli per codice articolo con filtro ' + filter);

        this.articolo = response;
        console.log(this.articolo);

        this.articoli.push(this.articolo)
        this.NumArt = this.articoli.length;
        console.log(this.articoli.length);
      },
      error => {
        console.log(error.error);
        console.log("Ricerchiamo per descrizione con filtro " + filter);
        this.articoliService.getArticoliByDescription(filter).subscribe(
          response => {

            this.articoli = response;
            console.log(this.articoli);

            this.NumArt = this.articoli.length;
            console.log(this.articoli.length);
          },
          error => {
            console.log(error.error);
            console.log('Ricerchiamo per EAN con filtro' + filter);

            this.articoliService.getArticoliByEan(filter).subscribe(
              response => {
                this.articoli = [];

                this.articolo = response;
                console.log(this.articolo);

                this.articoli.push(this.articolo);
                this.NumArt = this.articoli.length;
                console.log(this.articoli.length);


              },
              error => {
                console.log(error.error);
                this.articoli = [];

              }
            )


          }
        )
      }
    )
  }
  
  Elimina(CodArt: string) {
    console.log(`Eliminazione articolo ${CodArt}`);

    this.articoliService.delArticoloByCodeArt(CodArt).subscribe(
      response => {
        this.apiMsg = response;
        this.messaggio = this.apiMsg.message;
        this.refresh();
      }
    )
  }

  Modifica(CodArt: string)  {
    console.log(`Modifica articolo ${CodArt}`);
    this.router.navigate(['newart', CodArt]);
  }
}


