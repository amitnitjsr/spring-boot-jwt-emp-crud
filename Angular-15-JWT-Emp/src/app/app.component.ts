import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  login = false;
  constructor(private route:Router){
    
  }

  ngOnInit(): void {
    this.chechLogin();
  }

  logout() {
    localStorage.clear();
    this.login = false;
    this.route.navigate(['/login'])
  }

  chechLogin(){
    if (localStorage.getItem('JWT')) {
      this.login = true;
    }
    else {
      this.login = false;
    }
  }

}
