import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InventoryCategoryListComponent } from './InventoryCategory-list.component';
import { InventoryCategoryDetailComponent } from './InventoryCategory-detail.component';
import { InventoryCategoryEditComponent } from './InventoryCategory-edit.component';
import { InventoryCategoryEditGuard } from './InventoryCategory-edit.guard';
import { InventoryCategoryData } from './InventoryCategory-data';
import { GridModule, ToolbarService, ColumnMenuService,ExcelExportService,ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InventoryCategoryData)
    ,GridModule,
    RouterModule.forChild([
      { path: 'InventoryCategory', component: InventoryCategoryListComponent },
      { path: 'InventoryCategory/:id', component: InventoryCategoryDetailComponent },
      {
        path: 'InventoryCategory/:id/edit',
        canDeactivate: [InventoryCategoryEditGuard],
        component: InventoryCategoryEditComponent
      }
    ])
  ],
  providers: [PageService, SortService, FilterService, GroupService,ExcelExportService,
    ColumnMenuService , ToolbarService,ContextMenuService],
  declarations: [
    InventoryCategoryListComponent,
    InventoryCategoryDetailComponent,
    InventoryCategoryEditComponent
  ]
})
export class InventoryCategoryModule { }
