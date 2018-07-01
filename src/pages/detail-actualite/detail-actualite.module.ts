import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailActualitePage } from './detail-actualite';

@NgModule({
  declarations: [
    DetailActualitePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailActualitePage),
  ],
})
export class DetailActualitePageModule {}
