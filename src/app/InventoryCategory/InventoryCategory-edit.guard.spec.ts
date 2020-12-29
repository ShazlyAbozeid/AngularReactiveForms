import { TestBed, async, inject } from '@angular/core/testing';
import { InventoryCategoryEditGuard } from './InventoryCategory-edit.guard';

describe('ProductEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryCategoryEditGuard]
    });
  });

  it('should ...', inject([InventoryCategoryEditGuard], (guard: InventoryCategoryEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
