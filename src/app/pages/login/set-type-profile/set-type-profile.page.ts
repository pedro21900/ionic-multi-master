import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Preferences} from '@capacitor/preferences';


@Component({
    selector: 'app-login-two',
    templateUrl: './set-type-profile.page.html',
    styleUrls: ['./set-type-profile.page.scss'],
})
export class SetTypeProfilePage implements OnInit {

    typeProfileForm: UntypedFormGroup;

    background = {
        backgroundImage: 'url(../../../assets/img/splashbg.png)'
    };

    typeProfiles = [{
        type: 'Produtor',
        value: 'P'
    }, {
        type: 'Veterinário (Habilitado)',
        value: 'V'
    }, {
        type: 'Ambos',
        value: 'PV'
    }];


    constructor(
        private router: Router) {
    }

    ngOnInit() {
        this.typeProfileForm = new UntypedFormGroup({
            radioButton: new UntypedFormControl(null, Validators.required)
        });
    }

    async saveTypeProfile() {
        await Preferences.set({key: 'typeProfile', value: this.typeProfileForm.value.radioButton});
        this.router.navigate(['login', 'validation']);
    }
}
