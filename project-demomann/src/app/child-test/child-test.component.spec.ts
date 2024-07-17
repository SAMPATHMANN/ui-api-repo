import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTestComponent } from './child-test.component';

describe('ChildTestComponent', () => {
  let component: ChildTestComponent;
  let fixture: ComponentFixture<ChildTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
