import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InventoryCategory } from './InventoryCategory';
import { InventoryCategoryService } from './InventoryCategory.service';
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
@Component({
  selector: 'pm-InventoryCategoryEdit',
  templateUrl: './InventoryCategory-edit.component.html'
})
export class InventoryCategoryEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Inventory Category Edit';
  errorMessage: string;
  InventoryCategoryForm: FormGroup;
  InventoryCategory: InventoryCategory;
  private sub: Subscription;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  get tags(): FormArray {
    return this.InventoryCategoryForm.get('tags') as FormArray;
  }
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private InventoryCategoryService: InventoryCategoryService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      ShortString: {
        required: 'Name is required.',
        minlength: 'Name must be at least three characters.',
        maxlength: 'Name cannot exceed 50 characters.'
      },
      LongString: {
        required: 'Code is required.'
      },
      CanShowDialogForScan: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.InventoryCategoryForm = this.fb.group({
      ShortString: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      LongString: ['', Validators.required],
      CanShowDialogForScan: ['', NumberValidators.range(1, 5)],
      
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.InventoryCategoryForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.InventoryCategoryForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(id: number): void {
    this.InventoryCategoryService.getProduct(id)
      .subscribe({
        next: (product: InventoryCategory) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(InventoryCategory: InventoryCategory): void {
    if (this.InventoryCategoryForm) {
      this.InventoryCategoryForm.reset();
    }
    this.InventoryCategory = InventoryCategory;

    if (this.InventoryCategory.id === 0) {
      this.pageTitle = 'Add Category';
    } else {
      this.pageTitle = `Edit Category: ${this.InventoryCategory.ShortString}`;
    }

    // Update the data on the form
    this.InventoryCategoryForm.patchValue({
      ShortString: this.InventoryCategory.ShortString,
      LongString: this.InventoryCategory.LongString,
      CanShowDialogForScan: this.InventoryCategory.CanShowDialogForScan
    });
    //this.InventoryCategoryForm.setControl('tags', this.fb.array(this.InventoryCategory.tags || []));
  }

  DeleteCategory(): void {
    debugger;
    if (this.InventoryCategory.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.InventoryCategory.ShortString}?`)) {
        this.InventoryCategoryService.deleteProduct(this.InventoryCategory.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveProduct(): void {
    if (this.InventoryCategoryForm.valid) {
      if (this.InventoryCategoryForm.dirty) {
        const p = { ...this.InventoryCategory, ...this.InventoryCategoryForm.value };

        if (p.id === 0) {
          this.InventoryCategoryService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.InventoryCategoryService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.InventoryCategoryForm.reset();
    this.router.navigate(['/InventoryCategory']);
  }
}
