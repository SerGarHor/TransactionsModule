import { Component, ViewChildren, QueryList, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { otpRequest } from 'src/app/interfaces/request/otpRequest.interface';
import { otpResponse } from 'src/app/interfaces/response/otpResponse.interface';
import { singUpResponse } from 'src/app/interfaces/response/singupResponse.interface';
import { LoginService } from 'src/app/services/login.service';
import { OtpValidator } from 'src/app/shared/validators/otp.validator';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class OtpComponent {
    otpForm: FormGroup;
    otpError: string = '';
    isLoading: boolean = false

    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

    constructor(
        private fb: FormBuilder,
        private services: LoginService,
        private snackBar: MatSnackBar,
    ) {
        this.otpForm = this.fb.group({
            otp: this.fb.array([...Array(6)].map(() => new FormControl('', [
                Validators.required,
                OtpValidator.isNumeric
            ])))
        }, {
            validators: OtpValidator.hasSixDigits
        });
    }

    get otpControls(): FormControl[] {
        return (this.otpForm.get('otp') as FormArray).controls as FormControl[];
    }

    handleInput(event: any, index: number) {
        const input = event.target;
        const value = input.value;
        const otpArray = this.otpForm.get('otp') as FormArray;

        // Validar solo números
        if (!/^\d$/.test(value)) {
            input.value = '';
            otpArray.controls[index].setValue('');
            return;
        }

        otpArray.controls[index].setValue(value);

        // Mover al siguiente campo si hay un valor
        if (value && index < 5) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }
    }

    handleBackspace(event: any, index: number) {
        if (event.key === 'Backspace' && index > 0) {
            const otpArray = this.otpForm.get('otp') as FormArray;
            otpArray.controls[index].setValue(''); // Limpiar el campo actual
            this.otpInputs.get(index - 1)?.nativeElement.focus(); // Mover al campo anterior
        }
    }

    enviarOTP() {

        if (this.otpForm.invalid) {
            this.otpError = 'El código OTP debe ser de 6 números.';
            return;
        }

        this.otpError = '';
        let otpValue = this.otpForm.value.otp.join('');
        let data: any

        if (this.services.userSingUp.action == 'REGISTER') {
            this.services.userSingUp.otp = otpValue
            data = this.services.userSingUp
        } else {
            data = {
                action: "VALIDATION_OTP",
                otp: otpValue,
                numberId: this.services.userData.numberId
            }
        }

        this.services.validOtp(data).subscribe({
            next: (res: otpResponse) => {
                this.isLoading = false;
                console.log('Respuesta otp', res)
                if (res.code == "201") {
                    let messages: object = {
                        title: 'El registro ha sido completado con éxito. 🎉',
                        text: `Para poder acceder a la plataforma, 
                        necesitamos confirmar la información 
                        con tu EPS. En cuanto ellos validen tus 
                        datos, te notificaremos por correo electrónico para que puedas iniciar sesión.   
                        Gracias por tu paciencia. ¡Pronto podrás 
                        gestionar tus autorizaciones de manera fácil y segura!`
                    }

                    this.openDialog(messages)
                }

                if (res.code == "200") {
                    this.showMessage('!Bienvenido¡')
                }
            },
            error: (err) => {
                console.error(err)
            }
        });

    }

    openDialog(messages: any) {
        console.log('messages', messages)
        Swal.fire({
            html: `
            <div style="max-height: 200px; overflow-y: auto; color: white; text-align: justify;">
            <h1>${messages.title}</h1>
            <p> ${messages.text}</p>
          </div>
            `,
            showConfirmButton: true,
            customClass: {
                popup: 'custom-popup'
            }
        })
    }

    showMessage(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
}
