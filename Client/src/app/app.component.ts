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
  imageSrc = 'src/app/Img_Icon/upload.png'  

  image: any;
  imagesUpload:any=[];
  imagesDownload:any=[];
  imagesTemp:any=[];

  constructor(private http: HttpClient, private serv: DownloadService) { }

  ngOnInit(){}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.imagesUpload = event.target.files;
    }
    // var reader = new FileReader();
    // reader.readAsDataURL(this.image);
    // reader.onload = (_event) => {
    // this.url = reader.result;
    // };
  }

  onUpload(event: any) {
    const formData = new FormData();
    this.image=event;
    this.imagesDownload.push(this.image);
    formData.append('file', this.image);
    this.http.post<any>(this.server + '/file', formData).subscribe((res) => {
    },
      (err) => console.log(err)
    );
    
    this.onUploadCancel(this.image)
  }

  onUploadAll(){
    const formData = new FormData();
    for(let img of this.imagesUpload){
      formData.append('files', img);
      this.imagesDownload.push(img);
    }
    this.http.post<any>(this.server + '/multipleFiles', formData).subscribe((res) => {
      },
        (err) => console.log(err)
      );
    this.imagesUpload=[];
  }

  onUploadCancel(event: any){
    let j=0;
    for(let i=0;i<this.imagesUpload.length;i++){
      if(this.imagesUpload[i].name!=event.name){
        this.imagesTemp.push(this.imagesUpload[i]);
      }
    }
    this.imagesUpload=this.imagesTemp;
    this.imagesTemp=[];
  }

  onDownloadCancel(event: any){
    let j=0;
    console.log(event.name)
    for(let i=0;i<this.imagesDownload.length;i++){
      if(this.imagesDownload[i].name!=event.name){
        this.imagesTemp.push(this.imagesDownload[i]);
      }
    }
    this.imagesDownload=this.imagesTemp;
    this.imagesTemp=[];
  }

  Downloadfile(event:any) {
    this.serv.getFile(event.name).subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL);
      this.onDownloadCancel(event)
    })
  }
  
  onDownloadAll(){
    for(let i=0;i<this.imagesDownload.length;i++){
      this.serv.getFile(this.imagesDownload[i].name).subscribe(data => {
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
      })
    }
    this.imagesDownload=[]
  }

}
