import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginasService } from '../../services/paginas.service';
import { UserI } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  // User: any = ['Administrador', 'Usuario'];

  constructor(private paginasService: PaginasService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(f: NgForm): void {
    this.paginasService.register(f.value).subscribe(res => {
      this.router.navigateByUrl('/login');
    });
  }

}