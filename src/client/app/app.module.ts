import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { RoomModule } from './room/room.module';
import { StaffModule } from './staff/staff.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, 
  HomeModule, CustomerModule, CategoryModule, RoomModule, StaffModule, 
  SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: ''
  }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
