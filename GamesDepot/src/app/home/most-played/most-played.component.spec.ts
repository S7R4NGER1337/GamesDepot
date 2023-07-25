import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedComponent } from './most-played.component';

describe('MostPlayedComponent', () => {
  let component: MostPlayedComponent;
  let fixture: ComponentFixture<MostPlayedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostPlayedComponent]
    });
    fixture = TestBed.createComponent(MostPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
