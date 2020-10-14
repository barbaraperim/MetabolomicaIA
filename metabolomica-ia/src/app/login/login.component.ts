import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly EMAIL_PATTERN = /^\w+([\+\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  login() {    
    this.authService.signIn(this.loginForm.get('email').value, this.loginForm.get('password').value).then(
      (res) => {        
        this.snackBar.open('Welcome!', 'Close', { duration: 3000 });
      },
      (err) => {        
        this.snackBar.open(err.message, 'Close', { duration: 3000 });
      }
    );
  }

  isEmpty(): boolean {
    return this.loginForm.get('email').value == null || this.loginForm.get('email').value === '' ||
    this.loginForm.get('password').value == null || this.loginForm.get('password').value === '';
  }
}
