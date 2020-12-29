import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryCategoryEditComponent } from './InventoryCategory-edit.component';

@Injectable({
  providedIn: 'root'
})
export class InventoryCategoryEditGuard implements CanDeactivate<InventoryCategoryEditComponent> {
  canDeactivate(component: InventoryCategoryEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.InventoryCategoryForm.dirty) {
      const ShortString = component.InventoryCategoryForm.get('ShortString').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${ShortString}?`);
    }
    return true;
  }
}
