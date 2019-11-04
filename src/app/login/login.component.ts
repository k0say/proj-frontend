import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid = ''
  password = ''
  //autenticato = true
  consentito = false
  errorMsg = 'Spiacente, la userId o la password sono errati!'
  authMsg = 'Congratz, sei loggato!'

  // per essere reinderizzato alla pagina giusta dopo aver immesso i dati corretti,
  // ho bisogno del code injection nel costruttore
  constructor(private route: Router) { }

  ngOnInit() {
  }

  gestAuth()  {
    if(this.userid === 'Nicola' && this.password === '123_Stella')  {
      //this.autenticato = true;
      this.route.navigate(['welcome', this.userid]);
      this.consentito = true;
    }
    else  {
      //this.autenticato = false;
      this.consentito = false;
    }
  }

}
