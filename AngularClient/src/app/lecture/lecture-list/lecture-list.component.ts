import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/app/models/Lecture';
import { LectureService } from 'src/app/shared/lectureService/lecture.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.css']
})
export class LectureListComponent implements OnInit {

  lectureList:Lecture[] = [];
  loading: boolean = true;

  constructor(private service: LectureService,private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((res:Lecture[])=>{
      this.lectureList =res;
      this.loading = false;
    });
  }

  createLecture(){
    this.router.navigateByUrl('/home/lecture');
    //window.open('/home/lecture', "_blank");
  }

}
