import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserChecked, ValidatePfOrPjService} from '../../services/validate-pf-or-pj.service';
import {Preferences} from '@capacitor/preferences';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/config.service';

@Component({
    selector: 'app-login-two',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: UntypedFormGroup;

    userChecked: UserChecked;

    background = {
        backgroundImage: 'url(../../../assets/login/horse.png)'
    };

    constructor(
        private formBuilder: UntypedFormBuilder,
        private validatePfOrPj: ValidatePfOrPjService,
        private router: Router,
        private configService:ConfigService
    ) {
    }

    async ngOnInit() {
        this.loginForm = this.formBuilder.group({
            password: [null, [Validators.required]],
        });
        this.configService.userLogged.subscribe(userLogged=>this.userChecked=userLogged)
    }

    signIn() {
        if (this.loginForm.valid) {
            this.router.navigate(['home']);
        } else {
            console.log('invalid');
        }
    }
}
