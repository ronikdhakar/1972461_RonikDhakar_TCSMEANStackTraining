import { Component } from '@angular/core';
import { TaskServiceService } from './task-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id:string=""
  name:string=""
  task:string=""
  deadline:string=""
  title = 'task-tracker';
  dataSource:any
  displayedColumns: string[] = ['id', 'name', 'task','deadline' ];

  constructor(public task_detail:TaskServiceService){
    
  }
  
  ngOnInit(){
    this.task_detail.fetchTask().subscribe(result=>this.dataSource=result)
  }

  Store(taskRef:any){    
    this.task_detail.storeTask(taskRef)
  }

  

}
