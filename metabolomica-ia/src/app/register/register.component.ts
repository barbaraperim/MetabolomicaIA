import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly EMAIL_PATTERN = /^\w+([\+\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;

  public errorMessage: string;
  public successMessage: string;

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  tryRegister() {
        
    this.authService.signUp(this.registerForm.get('email').value , this.registerForm.get('password').value).then(
        (res) => {
          this.snackBar.open('Your account was created!', 'Close', { duration: 3000 });
        },
        (err) => {
          this.snackBar.open(err.message, 'Close', { duration: 3000 });
        }
    );
    
  }

  isEmpty(): boolean {
    return this.registerForm.get('email').value == null || this.registerForm.get('email').value === '' ||
    this.registerForm.get('password').value == null || this.registerForm.get('password').value === '';
  }
}
