import { Input, Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive()
export class ParentComponent {
  // adding type here will produce problems, each comp will use type assertion
  // to the type `componentConfigs`
  @Input() componentConfigs: any;
  loading$?: Observable<boolean>;
  loading?: boolean;
  loadingHits$?: Observable<boolean>;
  loadingHits?: boolean;
}
