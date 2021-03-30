import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizServiceService } from '../quiz-service.service';
import { Quiz } from '../quiz.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  quiz_questions:Array<Quiz>=[]
  correct:number=0
  incorrect:number=0
  result:string="Fail"
  popup:boolean=false
  correct_answer_check:boolean=false
  obj={id:"",answer:"",selected:""}
  correct_answers = [] as any
  marks:number=0

  constructor(public quiz_ques:QuizServiceService, public router:Router) { }
  
  ngOnInit(): void {
    this.quiz_ques.loadQuizDetails().subscribe(data=>this.quiz_questions=data)  
  } 

  
  checkData(){
    this.correct=0
    this.incorrect=0
    

    this.quiz_questions.map(x=>{
      if (x.selected!="0" && x.answer==x.selected){
        this.correct+=1  
      }
      else{
        this.incorrect+=1   
      }
      

      this.obj.id=x.id
      this.obj.answer=x.answer
      this.obj.selected=x.selected
    

      
      this.correct_answers.push(this.obj)
      x.selected="0"
      this.obj={id:"",answer:"",selected:""}
    })
    

    this.popup=true

    this.marks=Math.round((this.correct/this.quiz_questions.length)*100)

    if ((this.correct/this.quiz_questions.length)*100 >= 70){
      this.result="Pass"
    }
    else{
      this.result="Fail"
    }  
  }


  Restart(){
    this.router.navigate(["home"])
  }


  correctAnswer(){
    this.correct_answer_check=true
    this.popup=false

  }

}
