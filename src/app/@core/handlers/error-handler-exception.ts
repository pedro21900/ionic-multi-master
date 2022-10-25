import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
import {Preferences} from '@capacitor/preferences';
import {Router} from '@angular/router';
import {Network} from '@capacitor/network';
import {UserChecked} from '../../services/validate-pf-or-pj.service';

@Injectable()
export class ErrorHandlerException implements ErrorHandler {

    type: string = 'danger';
    time: number = 10000;

    constructor(private _toastController: ToastController,
                private router:Router,
                private loadingCtrl: LoadingController) { }

    public async handleError(error) {
        const statusNetwork = await Network.getStatus();
        const user=await  Preferences.get({key:'user'});
        const userLogged:UserChecked=JSON.parse(user.value);

        if(!statusNetwork.connected && userLogged==null) {
            this.router.navigate(['empty-states'], { replaceUrl: true });
            this.loadingCtrl.dismiss();
        }

        console.warn(error);
        if (!error) return;
        if (error instanceof HttpErrorResponse) {
            this.loadingCtrl.dismiss();
                if (error.error.message) {
                    this.show(error.error.message);
                } else {
                    this.show('Problema ao conectar ao servidor!');
                }

        } else if (error.rejection) {
            if (error.rejection.message) {
                this.show(error.rejection.message);
            }
        } else if (error.body) {
            this.show(JSON.parse(error.body).message)
        } else {
            this.show(error.message);
        }
    }

    async show(error) {
        const toast = await this._toastController.create({
            message: error,
            color: this.type,
            duration: this.time,
            position:'top',
            buttons: [{
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            }]
        });
        toast.present();
    }
}
