import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {
    CapacitorSQLite,
    capEchoResult,
    capSQLiteChanges,
    capSQLiteResult,
    capSQLiteSet,
    JsonSQLite,
    SQLiteConnection,
    SQLiteDBConnection
} from '@capacitor-community/sqlite';
import {Capacitor} from '@capacitor/core';
import {ErrorHandlerException} from '../@core/handlers/error-handler-exception';
import {Preferences} from '@capacitor/preferences';
import {UserChecked} from './validate-pf-or-pj.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private userChain =new BehaviorSubject<UserChecked>(null);

    userLogged=this.userChain.asObservable();

    urlBase =from(this.getUrlBase());

    constructor() {
        from(this.getUserLogged()).subscribe(userLogged=>this.userChain.next(userLogged));
    }

    private async getUrlBase() :Promise<string> { return (await Preferences.get({key: 'estadoApiResource'})).value;  }

    private async getUserLogged(): Promise<UserChecked> {
        const userLogged = await Preferences.get({key: 'user'});
        return Object.assign(new UserChecked(), JSON.parse(userLogged.value));
    }

    setUserLogged(userChecked:UserChecked) {
        this.userChain.next(userChecked);
    }
}

