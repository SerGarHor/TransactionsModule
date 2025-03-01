import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments'
import { loginRequest } from '../interfaces/request/loginRequest.interface';
import { loginResponse } from '../interfaces/response/loginResponse.interface';
import { UserLogin } from '../interfaces/userLogin.interface';
import { otpResponse } from '../interfaces/response/otpResponse.interface';
import { otpRequest } from '../interfaces/request/otpRequest.interface';
import { epsResponse } from '../interfaces/response/epsResponse.interface';
import { singUpRequest } from '../interfaces/request/singupRequest.interface';
import { singUpResponse } from '../interfaces/response/singupResponse.interface';

const userData: UserLogin = {
    numberId: '',
    code: '',
    rol: '',
    status: '',
    token: ''
}

const userSingUp: singUpRequest = {
    action: '',
    email: '',
    password: '',
    phoneNumber: '',
    numberId: '',
    otp: '',
    name: '',
    typeIdentification: '',
    lastName: '',
    EPS: '',
    idEPS: '',
    cognitoId: '',
    habeasData: ''
}

@Injectable({
    providedIn: 'root'
})


export class LoginService {



    private _userLoggin = new BehaviorSubject<any>(userData);

    public get userData(): any {
        return this._userLoggin.getValue();
    }

    public set userData(v: any) {
        this._userLoggin.next(v);
    }

    private _usersingup = new BehaviorSubject<singUpRequest>(userSingUp);


    public get userSingUp(): singUpRequest {
        return this._usersingup.getValue();
    }

    public set userSingUp(v: singUpRequest) {
        this._usersingup.next(v);
    }

    apiUrl = environment.apiUrl

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }



    login(data: loginRequest): Observable<loginResponse> {
        return this.http.post<loginResponse>(
            `${this.apiUrl}/registerUser`,
            data,
            this.httpOptions
        );
    }

    singUp(data: singUpRequest): Observable<singUpResponse> {
        return this.http.post<singUpResponse>(
            `${this.apiUrl}/registerUser`,
            data,
            this.httpOptions
        );
    }

    validOtp(data: otpRequest): Observable<otpResponse> {
        return this.http.post<otpResponse>(
            `${this.apiUrl}/registerUser`,
            data,
            this.httpOptions
        );
    }

    getEps(data: object): Observable<epsResponse[]> {
        return this.http.post<epsResponse[]>(
            `${this.apiUrl}/registerUser`,
            data,
            this.httpOptions
        );
    }
}