import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logoutUser(); // Call the logout method from AuthService
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
