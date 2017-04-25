import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [StaffRoutingModule, SharedModule],
  declarations: [StaffComponent],
  exports: [StaffComponent]
})
export class StaffModule { } 
