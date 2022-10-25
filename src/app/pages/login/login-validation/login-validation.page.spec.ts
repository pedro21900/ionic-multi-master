import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LoginValidationPage} from './login-validation.page.';

describe('LoginTwoPage', () => {
    let component: LoginValidationPage;
    let fixture: ComponentFixture<LoginValidationPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginValidationPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginValidationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
