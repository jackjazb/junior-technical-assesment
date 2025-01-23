import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Defines the number of milliseconds for which toast messages will be displayed.
 */
const TOAST_TIMEOUT = 3000;

/**
 * Defines possible types for a toast message.
 */
export type ToastType = 'success' | 'error';

export type Toast = {
  type: ToastType;
  message: string;
  sub?: string;
};

/**
 * Provides a means for creating a toast message.
 * Removes messages after a fixed duration.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Emits a a new toast to subscribers when its value changes.
   */ 
  toast = new Subject<Toast | undefined>();

  private timeoutId: number | undefined;

  /**
   * Helper function for formatting an error and setting it as the current toast.
   */
  setError(text: string, error: { message: string, errors?: string[]; }) {
    const { message, errors } = error;
    let sub = `${message}`;
    if (errors) {
      sub += ': ' + errors.join(', ');
    }
    this.set('error', text, sub)
  }

  /**
   * Sets the current toast message and type. Also resets any pending toast timeouts.
   */
  set(type: ToastType, message: string, sub?: string) {
    clearTimeout(this.timeoutId);

    this.toast.next({
      type,
      message,
      sub
    });

    this.timeoutId = setTimeout(() => {
      this.toast.next(undefined);
    }, TOAST_TIMEOUT);
  }
} 
