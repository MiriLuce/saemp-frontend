import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });

  constructor() {
  }

  ngOnInit(): void { }

  onGetStudentData(application) {
    // TODO: Use EventEmitter with form value
    console.warn(application.value);
    alert('SUCCESS!');
  }
  
}
