import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCategoryDetailComponent } from './InventoryCategory-detail.component';

describe('ProductDetailComponent', () => {
  let component: InventoryCategoryDetailComponent;
  let fixture: ComponentFixture<InventoryCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
