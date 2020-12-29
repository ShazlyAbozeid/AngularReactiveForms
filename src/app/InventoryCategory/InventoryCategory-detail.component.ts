import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryCategory } from './InventoryCategory';
import { InventoryCategoryService } from './InventoryCategory.service';

@Component({
  templateUrl: './InventoryCategory-detail.component.html',
  styleUrls: ['./InventoryCategory-detail.component.css']
})
export class InventoryCategoryDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  InventoryCategory: InventoryCategory | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private InventoryCategoryService: InventoryCategoryService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.InventoryCategoryService.getProduct(id).subscribe({
      next: InventoryCategory => this.InventoryCategory = InventoryCategory,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/InventoryCategory']);
  }

}
