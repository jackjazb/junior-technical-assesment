import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jest.Mocked<ProductService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(async () => {
    const mockProductService = {
      createProduct: jest.fn().mockImplementation((product) =>
        of({
          ...product,
          id: '3',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
      updateProduct: jest.fn().mockImplementation((id, product) =>
        of({
          ...product,
          id,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
    };

    const mockToastService = {
      toast: {
        subscribe: jest.fn()
      },
      setError: jest.fn(),
      set: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: ToastService, useValue: mockToastService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('department')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.productForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test');
    form.controls['description'].setValue('Test Description');
    form.controls['department'].setValue('Test Department');

    expect(form.valid).toBeTruthy();
  });

  it('should validate name length', () => {
    const nameControl = component.productForm.controls['name'];

    nameControl.setValue('ab');
    expect(nameControl.errors?.['minlength']).toBeTruthy();

    nameControl.setValue('abc');
    expect(nameControl.errors).toBeNull();
  });

  it('should validate description length', () => {
    const descControl = component.productForm.controls['description'];

    descControl.setValue('short');
    expect(descControl.errors?.['minlength']).toBeTruthy();

    descControl.setValue('long enough description');
    expect(descControl.errors).toBeNull();
  });

  it('should create a new product', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.success, 'emit');
    const newProduct = {
      name: 'New Product',
      description: 'New Description',
      department: 'New Department'
    };

    component.productForm.setValue(newProduct);
    component.onSubmit();
    tick(500);

    expect(productService.createProduct).toHaveBeenCalledWith(newProduct);
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('should update an existing product', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.success, 'emit');
    component.product = {
      id: '1',
      name: 'Test Product 1',
      description: 'Test Description 1',
      department: 'Test Department 1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated Description',
      department: 'Updated Department'
    };

    component.productForm.setValue(updatedProduct);
    component.onSubmit();
    tick(500);

    expect(productService.updateProduct).toHaveBeenCalledWith('1', updatedProduct);
    expect(toastService.set).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('should handle errors when creating a product', fakeAsync(() => {
    productService.createProduct.mockReturnValueOnce(throwError(() => new Error('Test error')));
    const emitSpy = jest.spyOn(component.success, 'emit');

    component.productForm.setValue({
      name: 'New Product',
      description: 'New Description',
      department: 'New Department'
    });

    component.onSubmit();
    tick(500);

    expect(toastService.setError).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  }));

  it('should handle errors when updating a product', fakeAsync(() => {
    productService.updateProduct.mockReturnValueOnce(throwError(() => new Error('Test error')));
    const emitSpy = jest.spyOn(component.success, 'emit');

    component.product = {
      id: '1',
      name: 'Test Product 1',
      description: 'Test Description 1',
      department: 'Test Department 1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    component.productForm.setValue({
      name: 'New Product',
      description: 'New Description',
      department: 'New Department'
    });

    component.onSubmit();
    tick(500);

    expect(toastService.setError).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  }));

  it('should not emit the success event when the form is invalid', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.success, 'emit');

    component.productForm.setValue({
      name: 'ab',
      description: 'short',
      department: ''
    });

    component.onSubmit();
    tick(500);

    expect(emitSpy).not.toHaveBeenCalled();
  }));

  it('should emit cancel event', () => {
    const emitSpy = jest.spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should reset form on cancel', () => {
    component.productForm.setValue({
      name: 'Test Product',
      description: 'Test Description',
      department: 'Test Department'
    });

    component.onCancel();

    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('department')?.value).toBe('');
  });

  it('should populate form when product input changes', () => {
    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      department: 'Test Department',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    component.product = testProduct;
    component.ngOnChanges({
      product: {
        currentValue: testProduct,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.productForm.get('name')?.value).toBe(testProduct.name);
    expect(component.productForm.get('description')?.value).toBe(testProduct.description);
    expect(component.productForm.get('department')?.value).toBe(testProduct.department);
  });

  it('should show error messages when form is submitted with invalid data', () => {
    component.onSubmit();
    expect(component.isSubmitted).toBe(true);
    expect(component.shouldShowError('name')).toBe(true);
    expect(component.shouldShowError('description')).toBe(true);
    expect(component.shouldShowError('department')).toBe(true);
  });

  it('should not show error messages before form submission', () => {
    expect(component.shouldShowError('name')).toBe(false);
    expect(component.shouldShowError('description')).toBe(false);
    expect(component.shouldShowError('department')).toBe(false);
  });

});
