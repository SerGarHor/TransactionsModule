import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { loginResponse } from 'src/app/interfaces/response/loginResponse.interface';
import { loginRequest } from 'src/app/interfaces/request/loginRequest.interface';
import { infoCompanyResponse } from 'src/app/interfaces/response/infoCompanyResponse.interface';
import { environment } from 'src/environments/environments';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
    idCompany: string = ''
    form: FormGroup;
    isLoading: boolean = false
    imageUrl: string = ''

    constructor(
        private fb: FormBuilder,
        private services: LoginService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            numberId: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, ]]
        });
    }

    ngOnInit(): void {
      this.isLoading = true;
      let data = {
        action: "PARTNER",
        idPartner: ''
      }
    
      this.activateRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.idCompany = params['id'];
          data.idPartner = params['id'];
        }
      });
    
      this.services.getEpsWithid(data).subscribe({
        next: (res: infoCompanyResponse) => {
          this.isLoading = false;
          this.services.infoCompany = res;
          this.imageUrl = `${environment.apiUrlImg}${res.rol}.png`
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error al obtener infoCompany', err);
        }
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
                this.services.userLogin = res
                this.services.userLogin.numberId = this.form.get('numberId')?.value,
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
