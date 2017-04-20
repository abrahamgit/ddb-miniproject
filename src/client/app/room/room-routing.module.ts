import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'room', component: RoomComponent }
    ])
  ],
  exports: [RouterModule]
})
export class RoomRoutingModule {  }
