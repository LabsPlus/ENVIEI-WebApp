import { Component, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string, {
    timeOut = 3000,
    progressBar = true,
    closeButton = true,
    positionClass = 'toast-top-center',
    messageClass = 'toast-message',
    tapToDismiss = true,
    newestOnTop = true,

  } = {
    }) {
    this.toastr.success(message, title, {
      timeOut: timeOut,
      progressBar: progressBar,
      closeButton: closeButton,
      positionClass: positionClass,
      messageClass: messageClass,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      progressAnimation : 'decreasing',
    });
  }

  showError(message: string, title: string, {
    timeOut = 3000,
    progressBar = true,
    closeButton = true,
    positionClass = 'toast-top-center',
    messageClass = 'toast-message',
    tapToDismiss = true,
    newestOnTop = true,

  } = {
    }) {
    this.toastr.error(message, title, {
      timeOut: timeOut,
      progressBar: progressBar,
      closeButton: closeButton,
      positionClass: positionClass,
      messageClass: messageClass,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      progressAnimation : 'decreasing',
    });
  }

  showWarning(message: string, title: string, {
    timeOut = 3000,
    progressBar = true,
    closeButton = true,
    positionClass = 'toast-top-center',
    messageClass = 'toast-message',
    tapToDismiss = true,
    newestOnTop = true,

  } = {
    }) {
    this.toastr.warning(message, title, {
      timeOut: timeOut,
      progressBar: progressBar,
      closeButton: closeButton,
      positionClass: positionClass,
      messageClass: messageClass,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      progressAnimation : 'decreasing',
    });
  }

  showInfo(message: string, title: string, {
    timeOut = 3000,
    progressBar = true,
    closeButton = true,
    positionClass = 'toast-top-center',
    messageClass = 'toast-message',
    tapToDismiss = true,
    newestOnTop = true,

  } = {
    }) {
    this.toastr.info(message, title, {
      timeOut: timeOut,
      progressBar: progressBar,
      closeButton: closeButton,
      positionClass: positionClass,
      messageClass: messageClass,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      progressAnimation : 'decreasing',
    });
  }
}
