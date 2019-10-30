import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendneofsComponent } from './sendneofs.component';

describe('SendneofsComponent', () => {
  let component: SendneofsComponent;
  let fixture: ComponentFixture<SendneofsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendneofsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendneofsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
