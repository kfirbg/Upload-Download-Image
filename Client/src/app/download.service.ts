import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http:HttpClient) { }
  public server = 'http://localhost:3000';

  getFile(){
    return this.http.get(this.server+'/download',{responseType:'blob'});    
  }
}
