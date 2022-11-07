import {Component, OnInit} from '@angular/core';
import {SQLiteService} from '../../../../services/sql-lite.service';
import {UserChecked} from '../../../../services/validate-pf-or-pj.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EquinoRepository} from '../../../../repositories/equino.repository';
import {Equino} from '../../../../domain/equino';
import {from, Observable} from 'rxjs';
import {Especie} from '../../../../domain/especie';
import {EspecieRepository} from '../../../../repositories/especie.repository';
import {RacaRepository} from '../../../../repositories/raca.repository';
import {Raca} from '../../../../domain/raca';
import {PelagemRepository} from '../../../../repositories/pelagem.repository';
import {Pelagem} from '../../../../domain/pelagem';
import {PelagemVariedade} from '../../../../domain/pelagem-variedade';
import {ParticularidadeRepository} from '../../../../repositories/particularidade.repository';
import {Particularidade} from '../../../../domain/particularidade';
import {v4 as uuidv4} from 'uuid';
import {ConfigService} from '../../../../services/config.service';
import {ExploracaoPecuariaEquideoProvider} from '../../../../repositories/exploracao-pecuaria-equideos.repository';
import {ExploracaoPecuariaEquideo} from '../../../../domain/exploracao-pecuaria-equideos';
import {LoadingController} from '@ionic/angular';
import {PelagemVariedadeRepository} from '../../../../repositories/pelagem-variedade.repository';


@Component({
    selector: 'app-equino-edit',
    templateUrl: './equino-edit-cadastro-page.component.html',
    styleUrls: ['./equino-edit-cadastro-page.component.scss'],
})
export class EquinoEditCadastroPage implements OnInit {

    id:string;

    equinoForm: UntypedFormGroup;

    userChecked: UserChecked;

    $especie: Observable<Especie[]> = from(this.especieProvider.findAll());

    $raca: Observable<Raca[]> = from(this.racaProvider.findAll());

    sexos:any[]=['Macho','Femêa'];

    $pelagem: Observable<Pelagem[]> = from(this.pelagemProvider.findAll());

    $pelagemVariedade: Observable<PelagemVariedade[]> = from(this.pelagemVariedadeProvider.findAll());

    $particularidade: Observable<Particularidade[]> = from(this.particularidadeProvider.findAll());

    exploracaoPecuariaEquideo:ExploracaoPecuariaEquideo;

    constructor(
        private activatedRoute:ActivatedRoute,
        private sqLiteService: SQLiteService,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private equinoProvider:EquinoRepository,
        private especieProvider:EspecieRepository,
        private racaProvider:RacaRepository,
        private pelagemProvider:PelagemRepository,
        private pelagemVariedadeProvider:PelagemVariedadeRepository,
        private particularidadeProvider:ParticularidadeRepository,
        private userService:ConfigService,
        private exploracaoPecuariaEquideoProvider:ExploracaoPecuariaEquideoProvider,
        private loadingCtrl: LoadingController,
    ) {
    }

    async ngOnInit() {

        this.id = this.activatedRoute.snapshot.params['idEquino'];

        this.createForm();

        if (this.id) this.edit();
        else this.create();

        this.userService.userLogged.subscribe(userLogged => this.userChecked = userLogged);

        this.activatedRoute.queryParamMap.subscribe(async params => {
            const idPropriedade: number = Number(params.get('idPropriedade'));
            this.exploracaoPecuariaEquideo = await this.exploracaoPecuariaEquideoProvider.findById(idPropriedade);
        });
    }

    async validation() {

        const equino=new Equino();

        this.populateEquino(equino);
        this.mergeObjectSatellite(equino);


        console.log(equino);
        this.equinoProvider.insert(equino);
        this.router.navigate(['/home'], {replaceUrl: true});
    }

    populateEquino(equino:Equino){
        for (const equinoForm of Object.keys(this.equinoForm.value)) {
            if( typeof this.equinoForm.value[equinoForm] !='object' ){
                equino[equinoForm]=this.equinoForm.value[equinoForm];
            }
        }
    }

    mergeObjectSatellite(equino:Equino){
        equino.id = uuidv4();
        equino.cdEstado=this.exploracaoPecuariaEquideo.cdEstado;
        equino.cdExploracaoPecuaria=this.exploracaoPecuariaEquideo.id;

    }
    createForm(){
        this.equinoForm = this.formBuilder.group({
            cdEspecie: [null, [Validators.required]],
            dsIdentificacaoAnimal: [null, [Validators.required]],
            cdRaca: [null, [Validators.required]],
            inSexo: [null, [Validators.required]],
            dtNascimento: [null, [Validators.required]],
            //cdPelagem: [null, [Validators.required]],
            //dsCaracteristicasPelagemVariedade: [null, [Validators.required]],
            //cdParticularidade: [null, [Validators.required]],
            //dsCaracteristicasPelagem: [null, [Validators.required]],
            cdPelagemVariedade: [null, [Validators.required]],
            dsChip: [null],
            nrAssociacaoRaca: [null],
        });
    }

    private create() {

    }

    async edit() {
      const equino:Equino=  await this.equinoProvider.findById(this.id);
        console.log(equino)
        for (const equinoForm of Object.keys(equino)) {
            if( !this.equinoForm.value.hasOwnProperty(equinoForm))
                delete equino[equinoForm];
        }
console.log(equino)
        //this.equinoForm.setValue(equino)
        this.equinoForm.patchValue(equino)
    }
}