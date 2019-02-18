import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ActualitePage } from '../pages/actualite/actualite';
import { DenonciationPage } from '../pages/denonciation/denonciation';
import { InformationPage } from '../pages/information/information';
import { PopoverPage } from '../pages/popover/popover';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import { DenoncerServiceProvider } from '../providers/denoncer-service/denoncer-service';
import { PartenairePage } from '../pages/partenaire/partenaire';

import {Camera} from '@ionic-native/camera';
import {ChartsModule} from 'ng2-charts';
import { PartenaireServiceProvider } from '../providers/partenaire-service/partenaire-service';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { ActualiteServiceProvider } from '../providers/actualite-service/actualite-service';
import {Transfer} from "@ionic-native/transfer";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {DetailActualitePage} from "../pages/detail-actualite/detail-actualite";
import {DetailHomePage} from "../pages/detail-home/detail-home";
import { TemoignageServiceProvider } from '../providers/temoignage-service/temoignage-service';
import {DetailInformationPage} from "../pages/detail-information/detail-information";
import {ContactPage} from "../pages/contact/contact";
import { ContactServiceProvider } from '../providers/contact-service/contact-service';
import {Base64} from "@ionic-native/base64";
import {FilePath} from "@ionic-native/file-path";
import {SuiteDenonciationPage} from "../pages/suite-denonciation/suite-denonciation";
import { PopoverServiceProvider } from '../providers/popover-service/popover-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActualitePage,
    DenonciationPage,
    InformationPage,
    PopoverPage,
    PartenairePage,
    DetailActualitePage,
    DetailHomePage,
    DetailInformationPage,
    ContactPage,
    SuiteDenonciationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActualitePage,
    DenonciationPage,
    InformationPage,
    PopoverPage,
    PartenairePage,
    DetailActualitePage,
    DetailHomePage,
    DetailInformationPage,
    ContactPage,
    SuiteDenonciationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DenoncerServiceProvider,
    Camera,
    Transfer,
    File,
    FileChooser,
    FilePath,
    PartenaireServiceProvider,
    HomeServiceProvider,
    ActualiteServiceProvider,
    TemoignageServiceProvider,
    ContactServiceProvider,
    Base64,
    PopoverServiceProvider
  ]
})
export class AppModule {}
