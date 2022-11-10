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

export class VwEquino {
    id:string
    dsIdentificacaoAnimal: string;
    dsEspecie: string;
    dsRaca: string;
    lastModified:Date;
}

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

    $equinos: Observable<VwEquino[]>;

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
                const idExpPecEquideo: number = Number(params.get('idExpPecEquideo'));
                this.exploracaoPecuariaEquideo = await this.exploracaoPecuariaEquideoProvider.findById(idExpPecEquideo);
                this.$equinos = from(this.equinoProvider.findAllByExpPecEquideos(idExpPecEquideo));
            });
    }

    async ionChange(dsIdentificacaoAnimal: string) {
       this.$equinos= from(this.equinoProvider.findByDsIdentificacaoAnimal(dsIdentificacaoAnimal));
   }

    edit(id: string) {
        this.navController.navigateForward(['equino', 'edit', id], {queryParams: {idPropriedade: this.exploracaoPecuariaEquideo.id}});
    }

    create() {
        this.navController.navigateForward(['equino', 'edit'], {queryParams: {idPropriedade: this.exploracaoPecuariaEquideo.id}});

    }

    delete(id: string) {
        from(Dialog.confirm({
            title: 'Você tem certeza destra operacão ?',
            message: `Você não poderá recuperar o registro deletado !`,
        })).subscribe(async confirm => {
            if (confirm.value) {
                await this.equinoProvider.deleteById(id);
                this.$equinos = from(this.equinoProvider.findAll());
            }
        });
    }
}
