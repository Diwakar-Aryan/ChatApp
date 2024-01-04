import { Injectable } from '@angular/core';
import axios from 'axios'
@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor() { }

  getPresignedUrl(){
    axios.post('http://localhost:3000/putPresignedUrl',{
      Key : "Key",
      contentType:""
    })
  }
}
