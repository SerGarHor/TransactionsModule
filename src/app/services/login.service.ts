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
import { infoCompanyResponse } from '../interfaces/response/infoCompanyResponse.interface';

const userLogin: UserLogin = {
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

const infoCompany: infoCompanyResponse = {
    code: '',
    rol: '',
    token: ''
}

@Injectable({
    providedIn: 'root'
})


export class LoginService {



    private _userLoggin = new BehaviorSubject<any>(userLogin);

    public get userLogin(): any {
        return this._userLoggin.getValue();
    }

    public set userLogin(v: any) {
        this._userLoggin.next(v);
    }

    private _usersingup = new BehaviorSubject<singUpRequest>(userSingUp);


    public get userSingUp(): singUpRequest {
        return this._usersingup.getValue();
    }

    public set userSingUp(v: singUpRequest) {
        this._usersingup.next(v);
    }

    private _infoCompany = new BehaviorSubject<infoCompanyResponse>(infoCompany);

    public infoCompany$ = this._infoCompany.asObservable();

    public get infoCompany(): infoCompanyResponse {
        return this._infoCompany.getValue();
      }

    public set infoCompany(value: infoCompanyResponse) {
        this._infoCompany.next(value);
      }

    apiUrl = environment.apiUrl

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    getEpsWithid(data: object): Observable<infoCompanyResponse> {
        return this.http.post<infoCompanyResponse>(
            `${this.apiUrl}/registerUser`,
            data,
            this.httpOptions
        );
    }

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