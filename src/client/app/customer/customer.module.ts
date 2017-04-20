import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [CustomerRoutingModule, SharedModule],
  declarations: [CustomerComponent],
  exports: [CustomerComponent],
  providers: [NameListService]
})
export class CustomerModule { } 
