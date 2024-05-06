import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _sidebarOpen = new BehaviorSubject<boolean>(false);

  sidebarOpen$ = this._sidebarOpen.asObservable();

  toggleSidebar() {
    this._sidebarOpen.next(!this._sidebarOpen.value);
  }
}
