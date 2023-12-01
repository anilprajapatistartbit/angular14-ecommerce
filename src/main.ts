import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpR2pGfV5yd0VBal9QTnRdUiweQnxTdEZiWXxecHNWRGRVVUF+Xg==');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



