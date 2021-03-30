import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(public http:HttpClient) { }

  loadQuizDetails():Observable<Quiz[]>{
    return this.http.get<Quiz[]>("/assets/quiz_questions.json")
  }
}
