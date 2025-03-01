import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export class OtpValidator {
  static isNumeric(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { nonNumeric: 'Solo se permiten números' };
    }
    return null;
  }

  static hasSixDigits(control: AbstractControl): ValidationErrors | null {
    const otpArray = control.get('otp') as FormArray;
    if (otpArray && otpArray.controls.some(c => !c.value)) {
      return { invalidLength: 'El código OTP debe tener exactamente 6 dígitos' };
    }
    return null;
  }
}
