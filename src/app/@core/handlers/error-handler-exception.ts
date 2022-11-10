import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Network} from '@capacitor/network';
import {ConfigService} from '../../services/config.service';

/**
 * Class responsável por capturar erros
 */
@Injectable()
export class ErrorHandlerException implements ErrorHandler {

    //Cor do toast
    type: string = 'danger';
    // Tempo do toast (em milisegundos)
    time: number = 3000;

    constructor(private _toastController: ToastController,
                private configService:ConfigService,
                private router:Router,
                private loadingCtrl: LoadingController) { }

    /**
     * Class de interceptacão de erros
     * @param error objeto que contém os dados erro.
     */
    public async handleError(error) {
        //Guarta estado da conexão da rede
        const statusNetwork = await Network.getStatus();
        //Mostra página infromando que não há conexão presente
        this.configService.userLogged.subscribe(userLogged=>{
            if(!statusNetwork.connected && userLogged==null) {
                this.router.navigate(['empty-states'], { replaceUrl: true });
                this.loadingCtrl.dismiss();
            }
        })
        //Exibe erro no console
        console.warn(error);
        if (!error) return;
        //Tratamento de erros com o servidor
        if (error instanceof HttpErrorResponse) {
            this.loadingCtrl.dismiss();
                if (error.error.message) {
                    this.show(error.error.message);
                } else {
                    this.show('Problema ao conectar ao servidor!');
                }
        //Tratamento de erros no geral
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

    //Toast controller created
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
