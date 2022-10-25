import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LoginSetTypeProfilePage} from './login-set-type-profile.page';

describe('LoginTwoPage', () => {
    let component: LoginSetTypeProfilePage;
    let fixture: ComponentFixture<LoginSetTypeProfilePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginSetTypeProfilePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginSetTypeProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
