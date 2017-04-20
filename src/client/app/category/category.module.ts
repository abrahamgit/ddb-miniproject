import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CategoryRoutingModule, SharedModule],
  declarations: [CategoryComponent],
  exports: [CategoryComponent]
})
export class CategoryModule { } 
