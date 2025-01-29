import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserPaciencte } from 'src/app/interfaces/userPaciente.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class FormComponent {
    form: FormGroup;
    isLoading: boolean = false

    constructor(
        private fb: FormBuilder,
        private services: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            tipo: ['', Validators.required],
            cc: ['', [Validators.required, Validators.minLength(5)]]
        });
    }


    getUser() {
        this.isLoading = true
        sessionStorage.setItem('type', this.form.get('tipo')?.value)
        const data = {
            "action": this.form.get('tipo')?.value,
            "identificacion": this.form.get('cc')?.value
        }
        this.services.getUserData(data).subscribe((res: UserPaciencte) => {
            this.isLoading = false
            console.log('respuesta', res)
            if (res != null) {
                this.services.userInformation = res
                this.router.navigateByUrl('/form')
            } else {
                this.snackBar.open('Usuario no encontrado', 'X', {
                    duration: 5000,
                    panelClass: ['custom-snackbar'],
                    verticalPosition: 'top',  // Mostrar el snackbar en la parte superior
                    horizontalPosition: 'center',  // Centrado horizontalmente
                });
            }
        })
    }
}
