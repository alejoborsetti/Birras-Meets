import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginasService } from '../../services/paginas.service';
// import { UserI } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private paginasService: PaginasService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(f: NgForm): void {
    this.paginasService.login(f.value).subscribe(res => {
      this.router.navigateByUrl('/appointment');
    });
  }

}
