import { NgModule } from '@angular/core';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [RoomRoutingModule, SharedModule],
  declarations: [RoomComponent],
  exports: [RoomComponent]
})
export class RoomModule { } 
