import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../models/product.model';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  let testProduct: Product;

  beforeEach(async () => {
    // Reset testProduct every test in case of modification.
    testProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      department: 'Test Department',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = testProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name, department and information', () => {
    const productElement = fixture.nativeElement;
    expect(productElement.textContent).toContain(testProduct.name);
    expect(productElement.textContent).toContain(testProduct.department);
    expect(productElement.textContent).toContain(testProduct.description);
  });

  it('should display the product\'s last update time', () => {
    component.product.updatedAt = new Date('2025-01-31');
    fixture.detectChanges();

    const productElement = fixture.nativeElement;

    expect(productElement.textContent).toContain('Updated: Jan 31, 2025');
  });

  it('should emit the delete event with the current product', () => {
    const emitSpy = jest.spyOn(component.delete, 'emit');
    component.onDelete();

    expect(emitSpy).toHaveBeenCalledWith(testProduct);
  });

  it('should emit the edit event with the current product', () => {
    const emitSpy = jest.spyOn(component.edit, 'emit');
    component.onEdit();

    expect(emitSpy).toHaveBeenCalledWith(testProduct);
  });
});
