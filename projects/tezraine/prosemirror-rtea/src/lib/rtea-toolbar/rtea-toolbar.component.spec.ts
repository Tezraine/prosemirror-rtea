import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RteaToolbarComponent } from './rtea-toolbar.component';

describe('RteaToolbarComponent', () => {
  let component: RteaToolbarComponent;
  let fixture: ComponentFixture<RteaToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RteaToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RteaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
