import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpRequestService } from '../../services/http-request'; 
import { RequestOptions, ResponseData } from '../../models/api-models';

interface HeaderPair {
  name: string;
  value: string;
}

@Component({
  selector: 'app-http-client', 
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './http-client.html', 
  styleUrls: ['./http-client.css']
})
export class HttpClientComponent implements OnInit { 
  request: RequestOptions = {
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: '{}'
  };

  response: ResponseData | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  headersAsArray: HeaderPair[] = []; 

  constructor(private requestService: HttpRequestService) { } 

  ngOnInit() {
    this.mapHeadersToDisplay();
  }

  mapHeadersToDisplay() {
    this.headersAsArray = Object.keys(this.request.headers).map(key => ({
      name: key,
      value: this.request.headers[key]
    }));
  }

  mapHeadersToSend(): Record<string, string> {
    const headers: Record<string, string> = {};
    this.headersAsArray.forEach(pair => {
      if (pair.name && pair.value) {
        headers[pair.name] = pair.value;
      }
    });
    return headers;
  }

  addHeader() {
    this.headersAsArray.push({ name: '', value: '' });
  }

  removeHeader(index: number) {
    this.headersAsArray.splice(index, 1);
  }

  execute() {
    this.loading = true;
    this.response = null;
    this.errorMessage = null;

    try {
      const headersToSend = this.mapHeadersToSend();
      const optionsToSend: RequestOptions = { 
        url: this.request.url,
        method: this.request.method,
        headers: headersToSend, 
        body: undefined
      };
      
      if (this.request.body && this.request.body.trim() !== '' && ['POST', 'PUT', 'PATCH'].includes(optionsToSend.method)) {
        optionsToSend.body = JSON.parse(this.request.body);
      }
      
      this.requestService.executeRequest(optionsToSend).subscribe({
        next: (data: ResponseData) => {
          this.response = data;
          this.loading = false;
        },
        error: (errorResponse: ResponseData) => {
          this.response = errorResponse;
          this.errorMessage = `Error ${errorResponse.status} - La petición falló.`;
          this.loading = false;
        }
      });
    } catch (e) {
      this.errorMessage = 'Error en el Body JSON: Asegúrate de que el formato sea válido.';
      this.loading = false;
    }
  }

  get formattedBody() {
    if (this.response && this.response.body) {
      return JSON.stringify(this.response.body, null, 2); 
    }
    return '';
  }

}
