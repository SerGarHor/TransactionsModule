import { Component, EventEmitter, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { singUpRequest } from "src/app/interfaces/request/singupRequest.interface";
import { epsResponse } from "src/app/interfaces/response/epsResponse.interface";
import { singUpResponse } from "src/app/interfaces/response/singupResponse.interface";
import { LoginService } from "src/app/services/login.service";
import { OtpValidator } from "src/app/shared/validators/otp.validator";
import { CustomValidators } from "src/app/shared/validators/password.validator";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SingupComponent implements OnInit {
    form!: FormGroup;
    user!: any
    acudiente!: any
    isChecked: boolean = false
    isAccept: boolean = false
    formuser: any = ''
    isLoading: boolean = false
    hideComponent: boolean = false
    showAdditionalFields = false;
    errorMessage: string | null = null;
    habeasData: string = ''

    listEps: epsResponse[] = []

    constructor(
        private fb: FormBuilder,
        private services: LoginService,
        private snackBar: MatSnackBar,
        private router: Router,

    ) {

    }


    ngOnInit(): void {
        this.buildForm()
        const data: object = {
            "action": 'EPS',
        }
        this.services.getEps(data).subscribe({
            next: (res: epsResponse[]) => {
                this.isLoading = false;
                this.listEps = res
                console.log('listEps', res)
            },
            error: (err) => {

            }
        });
    }

    buildForm() {
        this.form = this.fb.group({
            numberId: ['', [Validators.required, OtpValidator.isNumeric]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, CustomValidators.strongPassword()]],
            phoneNumber: ['', [Validators.required, OtpValidator.isNumeric]],
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            typeIdentification: ['', [Validators.required]],
            EPS: ['', [Validators.required]],
            idEPS: ['', [Validators.required]],
            cognitoId: ['', [Validators.required]],
            habeasData: ['', [Validators.required]],
        });

    }

    changeEPS(eps: epsResponse) {
        this.form.get('EPS')?.setValue(eps.partnerName)
        this.form.get('idEPS')?.setValue(eps.id)
        this.habeasData = `
        Tu información será tratada conforme a la Ley 1581 de 2012 y sus decretos 
        reglamentarios sobre protección de datos personales. Al aceptar estos términos, 
        usted autoriza a ${eps.partnerName} a recolectar, almacenar, usar y procesar
        sus datos personales con el único fin de garantizar la correcta gestión de sus 
        solicitudes, en cumplimiento de los principios de legalidad, finalidad, libertad, 
        veracidad, seguridad, acceso y confidencialidad.`
    }

    send() {

        if (!this.showAdditionalFields) {
            this.isLoading = true;
            const data: singUpRequest = {
                action: "SIGNUP",
                email: this.form.get('email')?.value,
                password: this.form.get('password')?.value,
                phoneNumber: this.form.get('phoneNumber')?.value,
                numberId: this.form.get('numberId')?.value
            }

            this.services.singUp(data).subscribe({
                next: (res: singUpResponse) => {
                    this.isLoading = false;
                    if (res.httpStatusCode == 200) {
                        this.form.get('cognitoId')?.setValue(res.userSub)
                        this.showAdditionalFields = true
                    } else if (res.httpStatusCode == 400) {
                        this.isLoading = false;
                        let errorMessage = 'El correo ya ha sido registrado..';
                        this.showErrorMessage(errorMessage);
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    console.error('Error en login:', err);

                    let errorMessage = 'El correo ya ha sido registrado..';

                    if (err.status === 500) {
                        errorMessage = 'Error del servidor. Intenta más tarde.';
                    }
                    this.showErrorMessage(errorMessage);
                }
            });
        } else {
            this.services.userSingUp = this.form.getRawValue()
            this.services.userSingUp.action = "REGISTER"
            this.router.navigateByUrl('/otp');
        }
    }

    openDialog() {
        Swal.fire({
            html: `
            <div style="max-height: 200px; overflow-y: auto; color: white; text-align: justify;">
            <p>${this.habeasData}</p>
          </div>
            `,
            showConfirmButton: true,
            customClass: {
                popup: 'custom-popup'
            }
        })
    }

    acceptDataTreatment(event: MatCheckboxChange) {
        if (event.checked) {
            this.form.get('habeasData')?.setValue(this.habeasData)
        } else {
            this.form.get('habeasData')?.setValue('')
        }
    }

    showErrorMessage(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }

}