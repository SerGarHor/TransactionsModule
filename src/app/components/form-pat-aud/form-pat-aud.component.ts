import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserAcudiente } from "src/app/interfaces/userAcudiente.interface";
import { UserPaciencte } from "src/app/interfaces/userPaciente.interface";
import { UserService } from "src/app/services/user.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form-pat-aud',
    templateUrl: './form-pat-aud.component.html',
    styleUrls: ['./form-pat-aud.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormPatAud implements OnInit {
    form!: FormGroup;
    user!: UserPaciencte
    acudiente!: UserAcudiente
    isChecked: boolean = false
    isAccept: boolean = false
    formuser: any = ''
    isLoading: boolean = false

    constructor(
        private fb: FormBuilder,
        private services: UserService,
        private snackBar: MatSnackBar,
         private router: Router,
    ) {
        this.formuser = sessionStorage.getItem('type')
        if (sessionStorage.getItem('type') == 'USERPACIENTE') {
            this.user = this.services.userInformation
        } else {
            this.acudiente = this.services.userInformation
        }
    }

    onCheckboxChange() {
        if (!this.form.get('isChecked')?.value) {
            this.form.get('comentario')?.setValue('NO');
        } else {
            this.form.get('comentario')?.setValue('');
        }
    }

    ngOnInit(): void {
        if (sessionStorage.getItem('type') == 'USERPACIENTE') {
            this.form = this.fb.group({
                apellidos: [{ value: this.user.apellidos, disabled: true }, Validators.required],
                cedula: [{ value: this.user.cedula, disabled: true }, [Validators.required, Validators.minLength(5)]],
                ciudad: [{ value: this.user.ciudad, disabled: false }, Validators.required],
                comentario: [{ value: this.user.comentario, disabled: false }, Validators.required],
                direccion: [{ value: this.user.direccion, disabled: false }, Validators.required],
                email: [{ value: this.user.email, disabled: false }, [Validators.required, Validators.email]],
                fechaEntrega: [{ value: this.user.fechaEntrega, disabled: true }, Validators.required],
                medicamento1: [{ value: this.user.medicamento1, disabled: true }, Validators.required],
                nombres: [{ value: this.user.nombres, disabled: true }, Validators.required],
                numeroMedicamentos: [{ value: this.user.numeroMedicamentos, disabled: true }, Validators.required],
                periodicidadEntrega: [{ value: this.user.periodicidadEntrega, disabled: true }, Validators.required],
                telefono: [{ value: this.user.telefono, disabled: false }, [Validators.required, Validators.minLength(7)]],
                tipoEntrega: [{ value: this.user.tipoEntrega, disabled: true }, Validators.required],
                tipoId: [{ value: this.user.tipoId, disabled: true }, Validators.required],
                tipoRegistro: [{ value: this.user.tipoRegistro, disabled: true }, Validators.required],
                isChecked: [false, Validators.required],
                isAccept: [false, Validators.required],
                tratamientoDatos: [this.user.tratamientoDatos],
            });
        } else {
            this.form = this.fb.group({
                id: [{ value: this.acudiente.id, disabled: true }],
                apellidosAcudiente: [{ value: this.acudiente.apellidosAcudiente, disabled: true },],
                ciudadAcudiente: [{ value: this.acudiente.ciudadAcudiente, disabled: false }, Validators.required],
                emailAcudiente: [{ value: this.acudiente.emailAcudiente, disabled: false }, [Validators.required, Validators.email]],
                nombresAcudiente: [{ value: this.acudiente.nombresAcudiente, disabled: true },],
                direccionAcudiente: [{ value: this.acudiente.direccionAcudiente, disabled: false }, Validators.required],
                nombresPaciente: [{ value: this.acudiente.nombresPaciente, disabled: true },],
                apellidosPaciente: [{ value: this.acudiente.apellidosPaciente, disabled: true },],
                tipoIdPaciente: [{ value: this.acudiente.tipoIdPaciente, disabled: true },],
                numeroIdPaciente: [{ value: this.acudiente.numeroIdPaciente, disabled: true },],
                telefonoAcudiente: [{ value: this.acudiente.telefonoAcudiente, disabled: false }, [Validators.required, Validators.minLength(7)]],
                comentario: [{ value: this.acudiente.comentario, disabled: false },],
                isChecked: [false, Validators.required],
                isAccept: [false, Validators.required],
                tratamientoDatos: [this.acudiente.tratamientoDatos],
            });

        }
    }

    send() {
        this.isLoading = true
        if (this.form.valid) {
            let data
            if (sessionStorage.getItem('type') == 'USERPACIENTE') {
                data = {
                    "action": "UPDATEPACIENTE",
                    "identificacion": this.form.get('cedula')?.value,
                    "email": this.form.get('email')?.value,
                    "telefono": this.form.get('telefono')?.value,
                    "direccion": this.form.get('direccion')?.value,
                    "ciudad": this.form.get('ciudad')?.value,
                    "comentario": this.form.get('comentario')?.value ? this.form.get('comentario')?.value : this.form.get('comentario')?.setValue('NO')
                }
            } else {
                data = {
                    "action": "UPDATEACUDIENTE",
                    "identificacion": this.form.get('id')?.value,
                    "email": this.form.get('emailAcudiente')?.value,
                    "telefono": this.form.get('telefonoAcudiente')?.value,
                    "direccion": this.form.get('direccionAcudiente')?.value,
                    "ciudad": this.form.get('ciudadAcudiente')?.value,
                    "comentario": this.form.get('comentario')?.value ? this.form.get('comentario')?.value : this.form.get('comentario')?.setValue('NO')
                }
            }
            this.services.updateUserPaciente(data).subscribe((res: any) => {
                this.isLoading = false
                if (res == 'UPDATE') {
                    this.snackBar.open('Usuario Actualizado', 'X', {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                    });
                    setTimeout(() => {
                        window.location.href = 'https://es.wikipedia.org/wiki/Sandon%C3%A1';
                      }, 2000);
                }
            })
        } else {
            console.log('Formulario inválido');
        }
    }

    openDialog() {
        let message = this.form.get('tratamientoDatos')?.value
        console.log('message', message)
        Swal.fire({
            html: `
            <div style="max-height: 200px; overflow-y: auto; color: white; text-align: justify;">
            <p>${message}</p>
          </div>
            `,
            showConfirmButton: true,
            customClass: {
                popup: 'custom-popup'
            }
        })
    }
}