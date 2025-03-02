import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  phoneNumber: string = ''
  namePartner: string = ''
  constructor(
    private service: LoginService

  ) {
  }

  ngOnInit(): void {
    this.service.infoCompany$.subscribe(res => {
      this.phoneNumber = res.token
      this.namePartner = res.code
    });
  }
 
}
