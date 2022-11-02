import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropriedadeCardMdComponent } from './propriedade-card-md.component';

describe('ProductCardMdComponent', () => {
  let component: PropriedadeCardMdComponent;
  let fixture: ComponentFixture<PropriedadeCardMdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropriedadeCardMdComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropriedadeCardMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
