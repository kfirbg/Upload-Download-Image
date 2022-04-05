import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
import { DownloadService } from './download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public server = 'http://localhost:3000';
    
  image: any;
  url: any;
  filename: any;

  constructor(private http: HttpClient, private form: FormBuilder,private serv:DownloadService) {}

  ngOnInit() {}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.image);
    this.http.post<any>(this.server + '/file', formData).subscribe((res) => {
        this.filename = res.filename;
      },
      (err) => console.log(err)
    );
  }

  Downloadfile(){
    this.serv.getFile().subscribe(data=>{
    let downloadURL = window.URL.createObjectURL(data);
    saveAs(downloadURL);
    })
  }
}
   