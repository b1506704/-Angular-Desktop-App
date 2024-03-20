import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAssistantComponent } from './app-assistant.component';

describe('AppAssistantComponent', () => {
  let component: AppAssistantComponent;
  let fixture: ComponentFixture<AppAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
