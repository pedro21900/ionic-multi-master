import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserChecked, ValidatePfOrPj} from '../../../services/validate-pf-or-pj.service';
import {Router} from '@angular/router';
import {GetResult, Preferences} from '@capacitor/preferences';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {ServerApiResourceProvider} from '../../../providers/server-api-resource.provider';
import {ModalErrorPage} from '../../modal-error/modal-error-page.component';

@Component({
    selector: 'app-login-two',
    templateUrl: './login-validation.page.html',
    styleUrls: ['./login-validation.page.scss'],
})
export class LoginValidationPage implements OnInit {

    loginForm: UntypedFormGroup;

    userChecked: UserChecked = undefined;

    background = {
        backgroundImage: 'url(../../../assets/login/validation.png)'
    };
    $serverResourceInformation: Observable<any> = from(this.serverResourceInformation.findAll());

    constructor(
        private formBuilder: UntypedFormBuilder,
        private validatePfOrPj: ValidatePfOrPj,
        public navCtrl: NavController,
        private router: Router,
        private loadingCtrl: LoadingController,
        private serverResourceInformation: ServerApiResourceProvider,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            estado: [null, [Validators.required]],
            cpfOrCnpj: [null, [Validators.required]],
        });
    }

    async validation() {
        if (this.loginForm.valid) {
            const typeProfile: GetResult = await Preferences.get({key: 'typeProfile'});
            const cpfOrCnpj: string = this.loginForm.value.cpfOrCnpj.replace(/[^a-zA-Z0-9 ]/g, '');
            const loading = await this.loadingCtrl.create({ message: 'Validando....' });
            loading.present();
            //this.showLoading();
            this.validatePfOrPj
                .checkCnpjOrCpfByInTipoUsuario(cpfOrCnpj, typeProfile.value)
                .subscribe(async userChecked => this.userRouter(userChecked));

        }
    }

    async userRouter(userChecked: UserChecked) {
        if (userChecked.codMsgResponse == 'MS0001') {
            await Preferences.set({key: 'user', value: JSON.stringify(userChecked)});
            await Preferences.set({key: 'estadoApiResource', value: JSON.stringify(this.loginForm.value.estado)});
            this.loadingCtrl.dismiss();
            this.router.navigate(['/login', 'autentication']);
        } else {
            this.loadingCtrl.dismiss();
            this.modalErrorShow(userChecked.msgResponse);
        }
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
            title: 'Erro ao realizar verificação',
            text: error
        };
    };

    async showLoading() {

    }

    back() {
        this.navCtrl.back();
    }


}
