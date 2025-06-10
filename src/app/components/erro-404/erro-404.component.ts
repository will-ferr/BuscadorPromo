import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro-404',
  templateUrl: './erro-404.component.html',
  styleUrls: ['./erro-404.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Erro404Component {
  constructor(private router: Router) {}

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
