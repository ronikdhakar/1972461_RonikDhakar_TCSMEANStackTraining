import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  msg:string=""
  data:any=[]
  obj:any={}

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  LoginPage(){
    this.router.navigate(["/login"])

  }

  checkUser(loginRef:any){
    this.msg="Thanks for registering. Please click on Login"

    this.data.push(loginRef)
    sessionStorage.setItem("user_data",JSON.stringify(this.data))
    console.log(this.data)

  }

}
