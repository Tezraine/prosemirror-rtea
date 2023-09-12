import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RteaEditorComponent } from './rtea-editor.component';

describe('RteaEditorComponent', () => {
  let component: RteaEditorComponent;
  let fixture: ComponentFixture<RteaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RteaEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RteaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
