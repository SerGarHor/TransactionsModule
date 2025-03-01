import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { loginResponse } from 'src/app/interfaces/response/loginResponse.interface';
import { loginRequest } from 'src/app/interfaces/request/loginRequest.interface';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class LoginComponent {
    form: FormGroup;
    isLoading: boolean = false

    constructor(
        private fb: FormBuilder,
        private services: LoginService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            numberId: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, ]]
        });
    }

    //CustomValidators.strongPassword()


    getUser() {
        this.isLoading = true
      
        const data: loginRequest = {
            "action": 'LOGIN_USER',
            "numberId": this.form.get('numberId')?.value,
            "password": this.form.get('password')?.value
        }
        this.services.login(data).subscribe({
            next: (res: loginResponse) => {
              this.isLoading = false;
              if (res.code == '200') {
                this.services.userData = res
                this.services.userData.numberId = this.form.get('numberId')?.value,
                console.log('usuario', this.services.userData)
                this.router.navigateByUrl('/otp');
              } else {
                this.showErrorMessage('Usuario no encontrado');
              }
            },
            error: (err) => {
              this.isLoading = false;
              console.error('Error en login:', err);
              
              let errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
              
              if (err.status === 400) {
                errorMessage = 'Datos incorrectos. Verifica tu usuario y contraseña.';
              } else if (err.status === 500) {
                errorMessage = 'Error del servidor. Intenta más tarde.';
              }
              this.showErrorMessage(errorMessage);
            }
          });
          
    }

    showErrorMessage(message: string) {
        this.snackBar.open(message, 'X', {
          duration: 5000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }

      singUp() {
        this.router.navigateByUrl('/singup');
      }
}
