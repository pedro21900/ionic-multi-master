import {Component, OnInit} from '@angular/core';
import {Animation, AnimationController} from '@ionic/angular';
import {GetResult, Preferences} from '@capacitor/preferences';
import {ServerApiResource} from '../../domain/server-api-resource';
import {environment} from '../../../environments/environment';
import {SQLiteService} from '../../services/sql-lite.service';
import {UserChecked} from '../../services/validate-pf-or-pj.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.page.html',
    styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

    urlBase: string;

    API_RESOURCE: string = `rest/passaporteEquestre/consultaExploracaoPecuariaEquideos/`;

    layout = 'grid';

    items = [
        {
            image:
                'https://images.unsplash.com/photo-1563903530908-afdd155d057a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            text: 'Chanel Sunglasses UV Summer Ultra',
            price: 149,
            badge: '',
        },
        {
            image:
                'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=343&q=80',
            text: 'Vans Winnie SK8 Low Rider',
            price: 199.99,
            badge: '-10%',
        },
        {
            image:
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            text: 'Polaroid Instant Max 2020 Model',
            price: 299.99,
            badge: '',
        },
        {
            image:
                'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            text: 'Nike Air Jordan Ultra Run',
            price: 1542.59,
            badge: '',
        },
        {
            image:
                'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
            text: 'Hikking Bag Pack Off Road Camo',
            price: 14.99,
            badge: '',
        },
    ];


    constructor(private sqLiteService: SQLiteService) {
    }

    ngOnInit() {

    }


    changeView(param) {
        switch (param) {
            case 'grid':
                this.layout = 'grid';
                break;
            case 'card':
                this.layout = 'card';
                break;
            default:
                this.layout = 'grid';
                break;
        }
    }

    async keyUpEnter(cpfOrCnpj:string) {
        const cpfOrCnpjOnlyNumbers:number = parseInt(cpfOrCnpj.replace(/[^a-zA-Z0-9 ]/g, ''));
        const serverResourceInformation: GetResult = await Preferences.get({key: 'estadoApiResource'});
        const serverApiResource: ServerApiResource = JSON.parse(serverResourceInformation.value);
        const urlBase: string = serverApiResource[environment.columnTbEstado];
        this.sqLiteService.downloadDatabaseFromRequestParam(false, `${urlBase}${this.API_RESOURCE}`, cpfOrCnpjOnlyNumbers);

    }
}
