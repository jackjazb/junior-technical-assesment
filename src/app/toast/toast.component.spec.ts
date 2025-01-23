import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, NoopAnimationsModule],
      providers: [ToastService, provideNoopAnimations]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current toast message', () => {
    toastService.set('success','New Message');
    fixture.detectChanges();
    const toastElement = fixture.nativeElement;
    expect(toastElement.textContent).toContain('New Message');
  });
});
