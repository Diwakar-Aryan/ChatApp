import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  constructor() {}
  file: File | undefined;
  fileList: Array<any> = [];

  ngOnInit() {
    this.getFiles();
  }

  async getUrl() {
    const options = { Key: this.file?.name, contentType: this.file?.type };
    let url = await axios.post(
      'http://127.0.1:3000/api/s3/putPresignedUrl',
      options
    );
    let data = await this.file?.arrayBuffer();
    axios.put(url.data.data, data);
    await this.postFiles();
  }

  fileChanged(event: any) {
    this.file = event.target.files[0];
  }

  async postFiles() {
    try {
      let options = {
        files: [
          {
            name: this.file?.name,
            size: this.file?.size,
          },
        ],
      };
      await axios.post('http://127.0.1:3000/api/file/uploaded', options);
    } catch (error) {
      console.log(error);
    }
  }
  async getFiles() {
    let redata = await axios.get('http://127.0.1:3000/api/file/getFiles');
    this.fileList = redata.data.data;

    console.log(this.fileList);
  }
  async downloadFiles(file: any) {
    let options = {
      Key: file.file_name,
    };
    let resData = await axios.post(
      'http://127.0.1:3000/api/s3/getPresignedUrl',
      options
    );
    console.log(resData.data.data);
    let url = resData.data.data;
    window.open(url)
    // await axios.get(url);
  }
}
