import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';

/**
 * Renders a `ReactiveForm` which accepts product details.
 * Calls product service methods on create or update.
 * Emits events when updates are successful or the form is cancelled.
 */
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnChanges {
  /**
   * Allows a product to be passed for editing.
   * If this is not set, the form will create new products on submit.
   */
  @Input() product?: Product;
  /**
   * Emits when the form is cancelled.
   */
  @Output() cancel = new EventEmitter<void>();
  /** 
   * Emits when a product creates or updates successfully.
   */
  @Output() success = new EventEmitter<void>();

  productForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      department: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        department: this.product.department
      });
    } else if (changes['product'] && !this.product) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.productForm.valid) {
      return;
    }

    const product = this.productForm.value;
    if (this.product) {
      this.productService.updateProduct(this.product.id, product).subscribe({
        next: () => {
          this.toastService.set('success', 'Product updated.');
          this.success.emit();
          this.resetForm();
        },
        error: (error) => {
          this.toastService.setError('Error updating product', error);
        }
      });
    } else {
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.toastService.set('success', 'Product created.');
          this.success.emit();
          this.resetForm();
        },
        error: (error) => {
          this.toastService.setError('Error creating product', error);
        }
      });
    }

  }

  onCancel(): void {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.productForm.reset({
      name: '',
      description: '',
      department: ''
    });
  }

  shouldShowError(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && (control.touched || this.isSubmitted) && control.errors);
  }
}
