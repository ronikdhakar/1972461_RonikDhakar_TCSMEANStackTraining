import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  table_data:any=new Array()
  user:any=""

  constructor(public router:Router) { }

  ngOnInit(): void {
    let temp=sessionStorage.getItem("user_name")
    this.user=JSON.parse(temp || "{}").user
    
  }
  logOut(){
    this.router.navigate(["\login"])
  }

  fillTable(tableData:any){
    this.table_data.push(tableData)   

  }

}
