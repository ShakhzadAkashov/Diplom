import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/Test';
import { TestQuestion } from 'src/app/models/Testquestion';
import { TestService } from 'src/app/shared/TestService/test-service.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  test: Test = new Test();
  testTrue : Test = new Test();
  loading: boolean = true;
  bal;
  testId:number;

  constructor(private service:TestService,public _activatedRoute: ActivatedRoute) {
    this.testId = this._activatedRoute.snapshot.queryParams['id'];
   }

  ngOnInit(): void {
    if(this.testId != null)
      this.getTest();
  }

  getTest(){
    this.service.getById(this.testId).subscribe((res:Test)=>{
      this.test = res;
      //this.testTrue = this.test;
      this.resetTrueAnswers();
      this.loading = false;
    });
  }

  resetTrueAnswers(){
    this.test.testQuestions.forEach(q => {
      q.testQuestionAnswer.forEach(a=>{
        a.isCorrect = false;
      });
    });
  }

  checkTest(){
    return this.service.checkTest(this.test);
  }
  
  finishTest(){
    this.bal = 0.0;
    this.checkTest().subscribe((res:number)=>{
      this.bal = res;
      console.log(this.bal);
    });
    
  }

}
