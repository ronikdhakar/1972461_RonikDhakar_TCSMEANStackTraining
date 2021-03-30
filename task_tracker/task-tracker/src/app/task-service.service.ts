import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(public http:HttpClient) { }

  storeTask(login:any){
    this.http.post("http://localhost:3000/tasks",login).subscribe(result=>console.log(result),error=>console.log(error))
  }

  fetchTask(){
    return this.http.get("http://localhost:3000/tasks")
  }

}
