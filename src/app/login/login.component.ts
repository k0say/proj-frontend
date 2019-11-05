import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthappService } from '../services/authapp.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid = ''
  password = ''
  autenticato = true
  consentito = false
  errorMsg = 'Spiacente, la userId o la password sono errati!'
  authMsg = 'Congratz, sei loggato!'

  // per essere reinderizzato alla pagina giusta dopo aver immesso i dati corretti,
  // ho bisogno del code injection nel costruttore
  constructor(private BasicAuth: AuthappService, private route: Router) { }

  ngOnInit() {
  }

  gestAuth() {
    if (this.BasicAuth.autentica(this.userid, this.password)) {
      this.autenticato = true;
      this.route.navigate(['welcome', this.userid])
    }
    else {
      this.autenticato = false;

    }

  }

}
