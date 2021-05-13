import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

  }

  login() {
    let redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl') || '/';
    localStorage.setItem('redirectUrl', redirectUrl);
    this.auth.login();
  }
}
