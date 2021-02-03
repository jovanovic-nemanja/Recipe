import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public username: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getName();
  }

  public logout(): void {
    this.authService.logout();
  }

}
