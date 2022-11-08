import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import { Preferences} from '@capacitor/preferences';
import {SQLiteService} from '../../services/sql-lite.service';
import {ExploracaoPecuariaEquideoProvider} from '../../repositories/exploracao-pecuaria-equideos.repository';
import {ExploracaoPecuariaEquideo} from '../../domain/exploracao-pecuaria-equideos';
import {from, Observable} from 'rxjs';

@Component({
    selector: 'app-catalog',
    templateUrl: './propriedade-list-page.component.html',
    styleUrls: ['./propriedade-list-page.component.scss'],
})
export class PropriedadeListPage implements OnInit {


    API_RESOURCE: string = `rest/passaporteEquestre/consultaExploracaoPecuariaEquideos`;

    $propriedades:Observable<ExploracaoPecuariaEquideo[]> =from(this.exploracaoPecuariaEquideoProvider.findAll());

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
                this.$propriedades = from(this.exploracaoPecuariaEquideoProvider.findAll());
                loading.dismiss();
            });

    }

    equinoByPropriedadeIdNavigate(idPropriedade: number) {
        this.navController.navigateForward('equino',{queryParams: {idPropriedade: idPropriedade}});
    }
}
