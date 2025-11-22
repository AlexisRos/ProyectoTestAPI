// Archivo: src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes'; // Asumimos que esta ruta está bien

export const appConfig: ApplicationConfig = {
  providers: [
    // ⬇️ Estos son los proveedores mínimos necesarios para el lado del cliente ⬇️
    provideRouter(routes), // Proporciona el enrutamiento para el navegador
    provideHttpClient(),    // Proporciona el cliente HTTP
  ]
};