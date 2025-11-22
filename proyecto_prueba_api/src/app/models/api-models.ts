export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body: any; 
}

export interface ResponseData {
  status: number;
  time: number; 
  body: any; 
}