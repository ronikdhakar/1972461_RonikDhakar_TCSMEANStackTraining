import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  msg:string=""
  user_array:any={}

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  collectData(loginRef:any){
    var data=JSON.parse(sessionStorage.getItem("user_data") || '{}')
    sessionStorage.setItem("user_name",JSON.stringify(loginRef))
    

    for(let val of data){
      if (loginRef.user==val.user && loginRef.pass==val.pass){
      this.router.navigate(["/portfolio"])
      
      }
      else{
      this.msg="Incorrect Credentials"
      }
    }
  }

  
}
