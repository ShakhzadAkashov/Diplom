import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentTesting } from 'src/app/models/StudentTesting';
import { Test } from 'src/app/models/Test';
import { TestQuestion } from 'src/app/models/Testquestion';
import { StudentTestingService } from 'src/app/shared/studentTestingService/student-testing-service.service';
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
  studentTessting: StudentTesting = new StudentTesting();
  studentTestingList: StudentTesting[] = [];
  userId;

  constructor(private service:TestService,private studentTestingService: StudentTestingService,public _activatedRoute: ActivatedRoute) {
    this.testId = this._activatedRoute.snapshot.queryParams['id'];
   }

  ngOnInit(): void {
    if(this.testId != null){
      this.getAllStudentTesting();
      this.getTest();
      this.userId = this.getCurrentUserId();
    }
  }

  getTest(){
    this.service.getById(this.testId).subscribe((res:Test)=>{
      this.test = res;
      //this.testTrue = this.test;
      this.resetTrueAnswers();
      this.loading = false;
    });
  }

  getAllStudentTesting(){
    this.studentTestingService.getAllForStudent().subscribe((res:StudentTesting[])=>{
      this.studentTestingList = res;
    });
  }

  getCurrentUserId(){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userId = payLoad.UserID;
    return userId;
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
      this.createStudentTesting(this.test, this.bal);
      console.log(this.bal);
    });
  }

  createStudentTesting(test:Test, bal:number){
    var boolResult = false;
    var studentTessting = new StudentTesting();

    for(var i of this.studentTestingList){
      if(i.testId == test.id && i.studentId == this.userId && i.isTested == true){
        studentTessting = i;
        boolResult = true;
      }
    }

    if(boolResult == true){
      studentTessting.testScore = bal;
    }
    else{
      studentTessting.testId = test.id;
      studentTessting.testScore = bal;
    }

    this.studentTestingService.createOrEdit(studentTessting).subscribe(res=>{
      
    });
  }

}
