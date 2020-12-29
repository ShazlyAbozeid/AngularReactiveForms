import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { InventoryCategoryService } from './InventoryCategory.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GridComponent, ToolbarItems, GroupService, PageService, GroupSettingsModel, SelectionSettingsModel,
   ContextMenuItem,ContextMenuItemModel ,QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { RowSelectEventArgs  } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { InventoryCategory } from './InventoryCategory';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
 
@Component({
  templateUrl: './InventoryCategory-list.component.html',
  styleUrls: ['./InventoryCategory-list.component.css']
})
export class InventoryCategoryListComponent implements OnInit {
  pageTitle = 'Category List';
  public filterSettings: Object;
  public selectionOptions: SelectionSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public initialPage: PageSettingsModel;
  //public toolbarOptionsPDF: ToolbarItems[];
  @ViewChild('grid') public grid: GridComponent;
  public groupOptions: GroupSettingsModel;
  errorMessage = '';
  public InventoryCategory: InventoryCategory[] = [];
  public contextMenuItems: ContextMenuItem[] = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
  'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
  'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
  'LastPage', 'NextPage', 'Group', 'Ungroup'];
  public customcontextMenuItems: ContextMenuItemModel[] = [{ text: 'Copy with headers', target: '.e-content', id: 'copywithheader' }];
  constructor(private InventoryCategoryService: InventoryCategoryService, private router: Router,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    debugger;
     this.InventoryCategoryService.getProducts().subscribe({
      next: InventoryCategory => {
        debugger;
        this.InventoryCategory = InventoryCategory;
      },
      error: err => this.errorMessage = err
    });
    this.filterSettings = { type: 'Menu' };
    this.selectionOptions =  { type: 'Multiple' };
    this.toolbarOptions = ['ExcelExport'];
    //this.toolbarOptionsPDF = ['PdfExport'];
    this.groupOptions = { columns: ['id', 'ShortString','LongString','CanShowDialogForScan'] };
    this.initialPage = { pageSize:6 };
  }
  DeleteCategory(id: number,Shorstring: string): void {
    debugger;
    if (id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${Shorstring}?`)) {
        this.InventoryCategoryService.deleteProduct(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
   // this.InventoryCategoryForm.reset();
   this._document.defaultView.location.reload();
    
  }
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.grid.excelExport();
    }
  
}
//toolbarClickpdf(args: ClickEventArgs): void {
 // if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
 // this.grid.pdfExport();
//}

//}

columnMenuOpen() {
  //alert('columnMenuOpen event is Triggered');
}
columnMenuClick() {
 // alert('columnMenuClick event is Triggered');
}

contextMenuClick(args: MenuEventArgs): void {
  if (args.item.id === 'copywithheader') {
      this.grid.copy(true);
  }
}

//rowSelected(args: RowSelectEventArgs) {
 // const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
 // alert(selectedrowindex); // To alert the selected row indexes.
  //const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.
  // alert('row index: ' + args.row.getAttribute('aria-rowindex'));
  // alert('column index: ' + args.target.getAttribute('aria-colindex'));
  //let row_index=args.row.getAttribute('aria-rowindex');
  //let column_index =args.target.getAttribute('aria-colindex')
 
//if(Number(column_index)===1){
//  this.router.navigate(['/InventoryCategory', 'InventoryCategory.id']);
//}
//alert(InventoryCategory.id)
 // this.router.navigate(['/InventoryCategory', 'InventoryCategory.id', 'edit']);
//}
//customiseCell(args: QueryCellInfoEventArgs) {
 // if (args.column.headerText === 'Edit') {
   //alert(args.data[args.column.headerText]) 
   // this.router.navigate(['/InventoryCategory', 'InventoryCategory.id', 'edit']);
 // }
 
}


