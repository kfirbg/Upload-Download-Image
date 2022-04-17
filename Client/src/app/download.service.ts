import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http:HttpClient) { }
  public DownloadServer = 'http://localhost:3000/download';

  getFile(event:any){
   const header={
     content:event,
   }
    return this.http.get(this.DownloadServer,{headers:header ,  responseType:'blob'});    
  }
}
