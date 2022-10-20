import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


export class UserChecked {
    msgResponse: string;
    codMsgResponse: string;
    usuario: {
        dsCpfCnpj: string;
        dsNome: string;
        inTipoUsuario: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ValidatePfOrPj {

    API_RESOURCE: string = `https://smsgi.com.br/siapec3_1_des_rj/services/rest/passaporteEquestre/consultarUsuario/cpfCnpj/`;

    constructor(private http: HttpClient) {

    }

    checkCnpjOrCpfByInTipoUsuario(cpfOrCnpj: string, inTipoUsuario: string): Observable<UserChecked> {
        return this.http.post<UserChecked>(this.API_RESOURCE, {dsCpfCnpj: cpfOrCnpj, inTipoUsuario: inTipoUsuario});
    }

}
