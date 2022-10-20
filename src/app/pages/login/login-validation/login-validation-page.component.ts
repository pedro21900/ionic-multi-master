import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserChecked, ValidatePfOrPj} from '../../../services/validate-pf-or-pj.service';
import {Router} from '@angular/router';
import {GetResult, Preferences} from '@capacitor/preferences';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {ServerResourceInformation} from '../../../providers/server-resource-information.service';
import {ModalErrorPage} from '../../modal-error/modal-error-page.component';

@Component({
    selector: 'app-login-two',
    templateUrl: './login-validation-page.component.html',
    styleUrls: ['./login-validation-page.component.scss'],
})
export class LoginValidationPage implements OnInit {

    loginForm: UntypedFormGroup;

    userChecked: UserChecked = undefined;

    background = {
        backgroundImage: 'url(../../../assets/img/splashbg.png)'
    };
    $serverResourceInformation: Observable<any> = from(this.serverResourceInformation.findAll());

    constructor(
        private formBuilder: UntypedFormBuilder,
        private validatePfOrPj: ValidatePfOrPj,
        public navCtrl: NavController,
        private router: Router,
        private loadingCtrl: LoadingController,
        private  serverResourceInformation:ServerResourceInformation,
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
            const cpfOrCnpj:string=this.loginForm.value.cpfOrCnpj.replace('[^\d]','');
            this.showLoading();
            this.validatePfOrPj
                .checkCnpjOrCpfByInTipoUsuario(cpfOrCnpj, typeProfile.value)
                .subscribe(async userChecked => {
                    // tslint:disable-next-line:triple-equals
                    if (userChecked.codMsgResponse == 'MS0001') {
                        await Preferences.set({key: 'user', value: JSON.stringify(userChecked)});
                        this.loadingCtrl.dismiss();
                        this.router.navigate(['/login', 'autentication']);
                    }else{
                        this.loadingCtrl.dismiss();
                        this.showError(userChecked.msgResponse)
                    }
                });
        } else {
            console.log('invalid');
        }
    }

    back() {
        this.navCtrl.back();
    }
    async showLoading() {
        const loading = await this.loadingCtrl.create({
            message: 'Validando....',
        });

        loading.present();
    }

    async showError(error) {
        const modal = await this.modalController.create({
            component: ModalErrorPage,
            cssClass: 'modal-container',
            componentProps: {
                error: this.migrateErrorToInfo(error),
            },
        });
        return await modal.present();
    }

    migrateErrorToInfo =(error) => {
        return {
            icon: 'assets/img/error.png',
            title: "Erro ao realizar verificação",
            text: error
        }
    };
}
