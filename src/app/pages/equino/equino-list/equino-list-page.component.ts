import {Component, OnInit} from '@angular/core';
import { Preferences} from '@capacitor/preferences';
import {SQLiteService} from '../../../services/sql-lite.service';
import {UserChecked} from '../../../services/validate-pf-or-pj.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-catalog',
    templateUrl: './equino-list-page.component.html',
    styleUrls: ['./equino-list-page.component.scss'],
})
export class EquinoListPage implements OnInit {

    userChecked: UserChecked;

    API_RESOURCE: string = `rest/passaporteEquestre/consultaExploracaoPecuariaEquideos`;

    items = [
        {
            id:1,
            image:
                'https://images.unsplash.com/photo-1563903530908-afdd155d057a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            nome: 'Paçoca',
            especie: 'cachorro',
            idade: '6 anos',
            raca: 'Cofap',
            pelagem: 'Grossa',
            validade: 2022-10-12,
            badge: '',
        },
        {
            id:2,
            image:
                'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=343&q=80',
            nome: 'Natasha',
            especie: 'cachorro',
            idade: '6 anos',
            raca: 'Cofap',
            pelagem: 'Grossa',
            validade: 2022-10-12,
            badge: '-10%',
        },
        {
            id:3,
            image:
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            nome: 'Back',
            especie: 'cachorro',
            idade: '6 anos',
            raca: 'Cofap',
            pelagem: 'Grossa',
            validade: 2022-10-12,
            badge: '',
        },
        {
            id:4,
            image:
                'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            nome: 'Café',
            especie: 'cachorro',
            idade: '6 anos',
            raca: 'Cofap',
            pelagem: 'Grossa',
            validade: 2022-10-12,
            badge: '',
        },
        {
            id:5,
            image:
                'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            nome: 'Gato',
            especie: 'cachorro',
            idade: '6 anos',
            raca: 'Cofap',
            pelagem: 'Grossa',
            validade: 2022-10-12,
            badge: '',
        },
    ];


    constructor(private sqLiteService: SQLiteService,private router:Router) {
    }

    async ngOnInit() {
        const userLogged = await Preferences.get({key: 'user'});
        this.userChecked = JSON.parse(userLogged.value);
    }

    async keyUpEnter(cpfOrCnpj:string) {
        const cpfOrCnpjOnlyNumbers:number = parseInt(cpfOrCnpj.replace(/[^a-zA-Z0-9 ]/g, ''));
        const urlBase: string = (await Preferences.get({key: 'estadoApiResource'})).value;
        this.sqLiteService.downloadDatabaseFromRequestParam(false, `${urlBase}${this.API_RESOURCE}`, cpfOrCnpjOnlyNumbers);
    }

    edit(id: number) {
        this.router.navigate(['/equino','edit',id])
    }
    create() {
        this.router.navigate(['/equino','edit'])
    }
}
