import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import { Preferences} from '@capacitor/preferences';
import {SQLiteService} from '../../services/sql-lite.service';
import {ExploracaoPecuariaEquideoProvider} from '../../repositories/exploracao-pecuaria-equideos.repository';
import {ExploracaoPecuariaEquideo} from '../../domain/exploracao-pecuaria-equideos';
import {from, Observable} from 'rxjs';
import {ModalErrorPage} from '../modal-error/modal-error-page.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './propriedade-list-page.component.html',
    styleUrls: ['./propriedade-list-page.component.scss'],
})
export class PropriedadeListPage implements OnInit {


    API_RESOURCE: string = `rest/passaporteEquestre/consultaExploracaoPecuariaEquideos`;

    $expPecEquideo:Observable<ExploracaoPecuariaEquideo[]> =from(this.exploracaoPecuariaEquideoProvider.findAll());

    empty =
        {
            image: 'assets/img/empty-box.png',
            title: 'Sem propriedades no dispositivo',
            caption: ''
        }



    constructor(
        private loadingCtrl: LoadingController,
        private sqLiteService: SQLiteService,
        private navController:NavController,
        private modalController:ModalController,
        private exploracaoPecuariaEquideoProvider:ExploracaoPecuariaEquideoProvider) {
    }

    ngOnInit() {

    }

    async keyUpEnter(cpfOrCnpj:string) {
        const cpfOrCnpjOnlyNumbers:number = parseInt(cpfOrCnpj.replace(/[^a-zA-Z0-9 ]/g, ''));
        const urlBase: string = (await Preferences.get({key: 'estadoApiResource'})).value;
        const loading = await this.loadingCtrl.create({ message: 'Pesquisando....' });
        loading.present();
        from(this.sqLiteService.downloadDatabaseFromRequestParam(true, `${urlBase}${this.API_RESOURCE}`, cpfOrCnpjOnlyNumbers))
            .subscribe(()=> {
                this.$expPecEquideo = from(this.exploracaoPecuariaEquideoProvider.findAll());
                loading.dismiss();
            },error => {
                this.modalErrorShow(error);
                loading.dismiss();
            });

    }

    equinoByPropriedadeIdNavigate(idExpPecEquideo: number) {
        this.navController.navigateForward('equino',{queryParams: {idExpPecEquideo: idExpPecEquideo}});
    }

    async modalErrorShow(error) {
        const modal = await this.modalController.create({
            component: ModalErrorPage,
            cssClass: 'modal-container',
            componentProps: {
                error: this.migrateErrorToInfo(error),
            },
        });
        return await modal.present();
    }

    migrateErrorToInfo = (error) => {
        return {
            icon: 'assets/img/error.png',
            title: 'Erro ao realizar consulta',
            text: error
        };
    };
}
