import { Component, OnInit } from '@angular/core';
import { StudentSubject } from '../models/StudentSubject';
import { StudentSubjectServiceService } from '../shared/studentSubjectService/student-subject-service.service';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.component.html',
  styleUrls: ['./student-subject.component.css']
})
export class StudentSubjectComponent implements OnInit {

  studentSubjectList:StudentSubject[]=[];
  loading: boolean = true;
  constructor(private studentSubjectService: StudentSubjectServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.studentSubjectService.getAll().subscribe((res:StudentSubject[])=>{
      this.studentSubjectList =res;
      this.loading = false;
    });
  }

}
