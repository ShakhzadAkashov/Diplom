import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentPractice } from 'src/app/models/StudentPractice';
import { StudentPracticeService } from 'src/app/shared/studentPracticeService/student-practice.service';
import { ViewPracticeFileModalComponent } from '../view-practice-file-modal/view-practice-file-modal.component';

@Component({
  selector: 'app-student-practice-list-for-teacher',
  templateUrl: './student-practice-list-for-teacher.component.html',
  styleUrls: ['./student-practice-list-for-teacher.component.css']
})
export class StudentPracticeListForTeacherComponent implements OnInit {

  practiceList:StudentPractice[] = [];
  loading: boolean = true;

  @ViewChild('viewPracticeFileModal', { static: true }) viewPracticeFileModal: ViewPracticeFileModalComponent;

  constructor(private service: StudentPracticeService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAllForTeacher().subscribe((res:StudentPractice[])=>{
      this.practiceList =res;
      this.loading = false;
    });
  }

  RedirectToStudentPractice(Id:number,StudentPracticeId : number){
    this.router.navigate(['/home/studentPractice'], { queryParams: { id: Id, edit:false, studentPracticeId: StudentPracticeId} }).then(f => { location.reload(true) });
  }
}