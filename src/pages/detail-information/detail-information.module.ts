import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailInformationPage } from './detail-information';

@NgModule({
  declarations: [
    DetailInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailInformationPage),
  ],
})
export class DetailInformationPageModule {}
