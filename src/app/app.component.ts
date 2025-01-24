import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductService } from './services/product.service';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductCardComponent, ToastComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'junior-technical-assesment';

  // If set, holds the currently edited product.
  selectedProduct?: Product;
  products: Product[] = [];
  isLoading = false;

  constructor(private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.setError('Error loading products', error);
        this.isLoading = false;
      }
    });
  }

  onFormSuccess() {
    this.selectedProduct = undefined;
    this.loadProducts();
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = product;
  }

  onDeleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: (success) => {
        if (success) {
          this.toastService.set('success', 'Product deleted.');
          this.loadProducts();
        }
      },
      error: (error) => {
        this.toastService.setError('Error deleting product', error);
      }
    });
  }

  onCancelForm(): void {
    this.selectedProduct = undefined;
  }
}
