import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { DownloadService } from './download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  public server = 'http://localhost:3000';
  
  uploadMap =new Map;
  downloadMap =new Map;
  uploadImages:any=[];

  constructor(private http: HttpClient, private serv: DownloadService) { }

  ngOnInit(){}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.uploadImages = event.target.files;
      for(let img of this.uploadImages){
        this.uploadMap.set(img.name,img)
      }
    }
  }

  onUpload(event: any) {
    const formData = new FormData();
    this.downloadMap.set(event.key,event.value)
    formData.append('file', this.uploadMap.get(event.key));
    this.http.post<any>(this.server + '/file', formData).subscribe((res) => {
    },
      (err) => console.log(err)
    );
    this.onUploadCancel(event.key)
  }

  onUploadAll(){
    const formData = new FormData();
    for(let key of this.uploadMap.keys()){
      formData.append('files', this.uploadMap.get(key)); 
      this.downloadMap.set(key,this.uploadMap.get(key));
      this.onUploadCancel(key);
    }
    this.http.post<any>(this.server + '/multipleFiles', formData).subscribe((res) => {
      },
        (err) => console.log(err)
      );
  }

  onUploadCancel(event: any){
    this.uploadMap.delete(event);
  }

  onDownloadCancel(event:any){    
    this.downloadMap.delete(event);
  }

  Downloadfile(event:any) {
    this.serv.getFile(event.key).subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL);
      this.onDownloadCancel(event.key)
    })
  }
  
  onDownloadAll(){
    for(let key of this.downloadMap.keys()){
      this.serv.getFile(key).subscribe(data => {
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
      })  
      this.onDownloadCancel(key);
    }
  }

}
