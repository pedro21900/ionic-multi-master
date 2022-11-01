import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Preferences} from '@capacitor/preferences';


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
export class ValidatePfOrPjService {

    API_RESOURCE: string = `rest/passaporteEquestre/consultarUsuario`;

    constructor(private http: HttpClient ) {

    }

     async checkCnpjOrCpfByInTipoUsuario(cpfOrCnpj: string, inTipoUsuario: string): Promise<UserChecked> {
         const urlBase: string = (await Preferences.get({key: 'estadoApiResource'})).value;
         const params =new HttpParams()
             .set('cpfCnpj',cpfOrCnpj)
             .set('inTipoUsuario',inTipoUsuario)
         return this.http.get<UserChecked>(`${urlBase}${this.API_RESOURCE}`,{params}).toPromise();
     }

}
