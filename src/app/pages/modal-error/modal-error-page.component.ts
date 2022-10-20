import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-modal-location',
    templateUrl: './modal-error-page.component.html',
    styleUrls: ['./modal-error-page.component.scss'],
})
export class ModalErrorPage implements OnInit {

    @Input() error: { icon: string, title: string, text: string };

    constructor(private modal: ModalController) {
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modal.dismiss();
    }

}
