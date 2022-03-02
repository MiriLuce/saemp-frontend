import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });
  public currentTab: String;

  constructor() { }

  ngOnInit(): void { 
    this.currentTab = "studentDataTab";
  }

  onGetStudentData(application) {
    this.currentTab = "relativeDataTab";
    console.log(application);
  }

}
