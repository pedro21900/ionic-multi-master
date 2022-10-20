import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserChecked, ValidatePfOrPj} from '../../services/validate-pf-or-pj.service';
import {Preferences} from '@capacitor/preferences';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-two',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: UntypedFormGroup;

    userChecked: UserChecked;

    background = {
        backgroundImage: 'url(../../../assets/img/splashbg.png)'
    };

    constructor(
        private formBuilder: UntypedFormBuilder,
        private validatePfOrPj: ValidatePfOrPj,
        private router: Router
    ) {
    }

    async ngOnInit() {
        this.loginForm = this.formBuilder.group({
            password: [null, [Validators.required]],
        });
        const userLogged = await Preferences.get({key: 'user'});
        this.userChecked = JSON.parse(userLogged.value);
    }

    signIn() {
        if (this.loginForm.valid) {
            this.router.navigate(['home']);
        } else {
            console.log('invalid');
        }
    }
}
