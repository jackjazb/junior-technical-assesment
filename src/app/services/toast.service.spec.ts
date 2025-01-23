import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Toast, ToastService } from './toast.service';


describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should accept and add messages', () => {
    service.set('success', 'Test message.');
    service.toast.subscribe(message => {
      expect(message?.message).toEqual('Test message');
      expect(message?.type).toEqual('success');
    });
  });

  it('should accept an optional sub text', () => {
    service.set('success', 'Test message.', 'Sub text');
    service.toast.subscribe(message => {
      expect(message?.message).toEqual('Test message');
      expect(message?.type).toEqual('success');
      expect(message?.sub).toEqual('Sub text');
    });
  });

  it('should accept and store a message type', () => {
    let current: Toast | undefined;
    service.toast.subscribe(message => {
      current = message;
    });
    service.set('success', 'Test message');
    expect(current?.message).toEqual('Test message');
    expect(current?.type).toEqual('success');

    service.set('error', 'Error message');
    expect(current?.message).toEqual('Error message');
    expect(current?.type).toEqual('error');

  });

  it('should clear messages after a timeout', fakeAsync(() => {
    service.set('success', 'Test message.');
    tick(3000);

    service.toast.subscribe(message => {
      expect(message).toEqual(undefined);
    });
  }));

  it('should clear the message deletion timeout if another message is added', fakeAsync(() => {
    let current = undefined;
    service.toast.subscribe(message => {
      current = message?.message;
    });

    service.set('success', 'First');
    expect(current).toBe('First');
    tick(2000);

    service.set('success', 'Second');
    tick(2000);
    // Check that the original 3000ms timer has not cleared the toast.
    expect(current).toBe('Second');
  }));

  it('should format and add errors', ()=>{
    const error = {
      message: 'Validation failed',
      errors: ['Product name must be unique', 'ID must be unique']
    }
    service.setError('Error', error);
    service.toast.subscribe(message => {
      expect(message?.message).toEqual('Error');
      expect(message?.type).toEqual('error');
      expect(message?.sub).toEqual('Validation failed: Product name must be unique, ID must be unique');
    });
  })
});
