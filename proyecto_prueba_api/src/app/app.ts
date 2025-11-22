import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientComponent } from './components/http-client/http-client'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientComponent,
  ],
  
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'proyecto_prueba_api';
}