import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsEventsService {
  private productDeletedSubject = new Subject<void>();

  productDeleted$ = this.productDeletedSubject.asObservable();

  emitProductDeleted(): void {
    this.productDeletedSubject.next();
  }
}
