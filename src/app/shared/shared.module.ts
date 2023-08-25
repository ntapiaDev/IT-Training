import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedRoutingModule
  ],
  exports: [HeaderComponent],
})
export class SharedModule { }
