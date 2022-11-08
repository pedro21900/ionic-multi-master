import {Component, OnInit} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {SQLiteService} from '../../../services/sql-lite.service';
import {UserChecked} from '../../../services/validate-pf-or-pj.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExploracaoPecuariaEquideoProvider} from '../../../repositories/exploracao-pecuaria-equideos.repository';
import {ExploracaoPecuariaEquideo} from '../../../domain/exploracao-pecuaria-equideos';
import {EquinoRepository} from '../../../repositories/equino.repository';
import {Equino} from '../../../domain/equino';
import {from, Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {Dialog} from '@capacitor/dialog';

@Component({
    selector: 'app-catalog',
    templateUrl: './equino-list-page.component.html',
    styleUrls: ['./equino-list-page.component.scss'],
})
export class EquinoListPage implements OnInit {

    empty =
        {
            image: 'assets/img/empty-box.png',
            title: 'Sem Equinos no dispositivo',
            caption: 'Refênte a essa propriedade'
        }

    exploracaoPecuariaEquideo: ExploracaoPecuariaEquideo;

    $equinos: Observable<Equino[]>;

    constructor(
        private sqLiteService: SQLiteService,
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
        private exploracaoPecuariaEquideoProvider: ExploracaoPecuariaEquideoProvider,
        private equinoProvider: EquinoRepository
    ) {
    }

    async ngOnInit() {
        this.activatedRoute.queryParamMap
            .subscribe(async params => {
                const idPropriedade: number = Number(params.get('idPropriedade'));
                this.exploracaoPecuariaEquideo = await this.exploracaoPecuariaEquideoProvider.findById(idPropriedade);
                this.$equinos = from(this.equinoProvider.findAll());
            });
    }

    async keyUpEnter(cpfOrCnpj: string) {
        const cpfOrCnpjOnlyNumbers: number = parseInt(cpfOrCnpj.replace(/[^a-zA-Z0-9 ]/g, ''));
        const urlBase: string = (await Preferences.get({key: 'estadoApiResource'})).value;
        //this.sqLiteService.downloadDatabaseFromRequestParam(false, `${urlBase}${this.API_RESOURCE}`, cpfOrCnpjOnlyNumbers);
    }

    edit(id: string) {
        this.navController.navigateForward(['equino', 'edit', id], {queryParams: {idPropriedade: this.exploracaoPecuariaEquideo.idPropriedade}});
    }

    create() {
        this.navController.navigateForward(['equino', 'edit'], {queryParams: {idPropriedade: this.exploracaoPecuariaEquideo.idPropriedade}});

    }

    delete(id: string) {
        from(Dialog.confirm({
            title: 'Confirm',
            message: `Você deseja realmente deletar este registro?`,
        })).subscribe(async confirm => {
            if (confirm.value) {
                await this.equinoProvider.deleteById(id);
                this.$equinos = from(this.equinoProvider.findAll());
            }
        });
    }
}
