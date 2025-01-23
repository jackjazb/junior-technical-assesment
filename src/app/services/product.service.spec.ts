import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial products', fakeAsync(() => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(3);
      expect(products[0].name).toBe('Personal Loan');
    });
    tick(500);
  }));

  it('should create a new product', fakeAsync(() => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      department: 'Test Department'
    };

    service.createProduct(newProduct).subscribe(product => {
      expect(product.name).toBe(newProduct.name);
    });
    tick(500);
  }));

  it('should delete a product', fakeAsync(() => {
    service.deleteProduct('1').subscribe(success => {
      expect(success).toBe(true);
    });
    tick(500);
  }));
});
