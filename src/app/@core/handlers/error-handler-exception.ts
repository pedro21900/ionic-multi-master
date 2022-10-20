import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {Preferences} from '@capacitor/preferences';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerException implements ErrorHandler {

    type: string = 'danger';
    time: number = 10000;

    constructor(private _toastController: ToastController,private router:Router) { }

    public async handleError(error) {
        console.warn(error);
        if (!error) return;
        if (error instanceof HttpErrorResponse) {
            let statusCode: number = error.status;
            // Server or connection error happened
            if (!navigator.onLine) {

                const userLogged = await Preferences.get({key: 'user'});
                console.log(userLogged)
               if(userLogged.value==null) this.router.navigate(['empty-states'])
                // Handle offline error
                this.show("Sem conexão com a internet");
            } else {

                if (error.error.message) {
                    this.show(error.error.message);
                } else {
                    this.show('Problema ao conectar ao servidor!');
                }
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
