import { Component, HostListener  } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'warehouse';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.getToken() !== null && this.authService.getTokenExp() !== null){
      const tokenExpValue = new Date(this.authService.getTokenExp() || '');

      if (tokenExpValue instanceof Date){
        const tokenExpTimestamp: number = tokenExpValue.getTime();

        if (Date.now() >= tokenExpTimestamp){
          this.authService.logoutUser();
        }
        else{
          console.log("Token is valid");
          this.router.navigate(['/profile']);
        }
      }
      else{
        console.log("Token expiry invalid");
      }
    }
    else{
      console.log("Invalid token");
    }
  }

}
