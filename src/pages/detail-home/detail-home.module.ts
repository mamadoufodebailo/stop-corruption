import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailHomePage } from './detail-home';

@NgModule({
  declarations: [
    DetailHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailHomePage),
  ],
})
export class DetailHomePageModule {}
