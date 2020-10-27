import { Component, OnInit } from '@angular/core';
import { ZipService } from '../services/zip/ZipService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fileToUpload: FileList = null;
  data;
  progress;

  constructor(private zipService: ZipService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.zipService.getEntries(files[0]).subscribe((zipEntries) => {
      this.data = this.zipService.getData(zipEntries[0]).data;
      this.progress = this.zipService.getData(zipEntries[0]).progress;
      //console.log(zipEntries[0]);
      console.log(this.progress);
      
      this.data.subscribe((i) => {
        //console.log(i);
        
      });
      
      //console.log(this.data);
      
    });
    
    this.fileToUpload = files;
}

}
