import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastService } from '../services/toast.service';

/**
 * Renders a fixed position container for a toast message.
 * The message is provided by `ToastService`.
 */
@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms ease-in-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ]
})
export class ToastComponent {

  toast: Toast | undefined = undefined;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast.subscribe((toast) => {
      this.toast = toast;
    });
  }
};
