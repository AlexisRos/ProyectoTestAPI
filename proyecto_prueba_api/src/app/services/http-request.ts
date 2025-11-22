import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestOptions, ResponseData } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  executeRequest(options: RequestOptions): Observable<ResponseData> {
    const startTime = performance.now(); 
    
    let httpHeaders = new HttpHeaders();
    for (const key in options.headers) {
      if (options.headers.hasOwnProperty(key)) {
        httpHeaders = httpHeaders.set(key, options.headers[key]);
      }
    }

    const requestObservable: Observable<any> = this.http.request(
      options.method, 
      options.url, 
      {
        body: options.body,
        headers: httpHeaders,
        observe: 'response', 
        responseType: 'json'
      }
    ).pipe(
      catchError(error => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        
        const errorResponse: ResponseData = {
          status: error.status,
          time: duration,
          body: error.error
        };
        return throwError(() => errorResponse);
      }),
      
      map(response => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        const responseData: ResponseData = {
          status: response.status,
          time: duration,
          body: response.body
        };
        return responseData;
      })
    );

    return requestObservable;
  }
}