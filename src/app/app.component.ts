import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'BuscadorPromocoes';
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
