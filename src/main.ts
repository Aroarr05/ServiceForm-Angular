import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//se le añade para la fecha
import { importProvidersFrom } from '@angular/core';// se le añade para la fecha
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      BsDatepickerModule
    ),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
