import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserPaciencte } from '../interfaces/userPaciente.interface';
import { UserAcudiente } from '../interfaces/userAcudiente.interface';

const initUserPaciente: UserPaciencte = {
    apellidos: '',
    cedula: '',
    ciudad: '',
    comentario: '',
    direccion: '',
    email: '',
    fechaEntrega: '',
    medicamento1: '',
    nombres: '',
    numeroMedicamentos: '0',
    periodicidadEntrega: '',
    telefono: '0',
    tipoEntrega: '',
    tipoId: '',
    tipoRegistro: '',
    tratamientoDatos: ''
}

const initUserAcudiente: UserAcudiente = {
    id: '',
    apellidosAcudiente: '',
    ciudadAcudiente: '',
    emailAcudiente: '',
    nombresAcudiente: '',
    direccionAcudiente: '',
    nombresPaciente: '',
    apellidosPaciente: '',
    tipoIdPaciente: '',
    numeroIdPaciente: '',
    telefonoAcudiente: '',
    tratamientoDatos: '',
    valTratamientoDatos: '',
    comentario: ''
  };
  

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private _userInformation = new BehaviorSubject<any>(initUserPaciente);


    public get userInformation(): any {
        return this._userInformation.getValue();
      }
    
      public set userInformation(v: any) {
        this._userInformation.next(v);
      }

    apiUrl = 'https://9g2xon1fy0.execute-api.us-east-1.amazonaws.com/Inphapro/';

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    buscarUsuario(tipo: string, cc: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?tipo=${tipo}&cc=${cc}`);
    }

    getUserData(data: any): Observable<UserPaciencte> {
        return this.http.post<UserPaciencte>(
            `${this.apiUrl}/informacionPersonal`,
            data,
            this.httpOptions
        );
    }

    updateUserPaciente(data: any): Observable<UserPaciencte> {
        return this.http.post<UserPaciencte>(
            `${this.apiUrl}/informacionPersonal`,
            data,
            this.httpOptions
        );
    }
}
