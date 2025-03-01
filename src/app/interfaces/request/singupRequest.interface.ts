export interface singUpRequest {
    action: string;
    email: string;
    password: string;
    phoneNumber: string;
    numberId: string;
    otp?: string;
    name?: string;
    typeIdentification?: string;
    lastName?: string;
    EPS?: string;
    idEPS?: string;
    cognitoId?: string;
    habeasData?: string;
}
