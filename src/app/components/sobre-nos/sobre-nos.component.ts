import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent {
  constructor(private router: Router) { }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
