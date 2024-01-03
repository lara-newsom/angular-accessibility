import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPanelLayoutComponent } from './two-panel-layout.component';

describe('TwoPanelLayoutComponent', () => {
  let component: TwoPanelLayoutComponent;
  let fixture: ComponentFixture<TwoPanelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoPanelLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoPanelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
