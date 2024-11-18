import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes'; // Import the routes
import { provideHttpClient } from '@angular/common/http';

// Application configuration using ApplicationConfig
export const appConfig: ApplicationConfig = {
  //providers: [
    //provideRouter(appRoutes)  // Provide the router with the routes configuration
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes)]
 // ]
};
