import { Component, OnInit,ViewChild} from '@angular/core';
import { Subject } from '../models/Subject';
import { SubjectService } from '../shared/subjectService/subject-service.service';
import { CreateOrEditSubjectComponent } from './create-or-edit-subject/create-or-edit-subject.component';
import { ToastrService } from 'ngx-toastr';
import { ViewSubjectModalComponent } from '../subject/view-subject-modal/view-subject-modal.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjectList:Subject[]=[];
  loading: boolean = true;
  @ViewChild('createOrEditSubjectModal', { static: true }) createOrEditSubjectModal: CreateOrEditSubjectComponent;
  @ViewChild('viewSubjectModal', { static: true }) viewSubjectModal: ViewSubjectModalComponent; 

  constructor(private service: SubjectService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((res:Subject[])=>{
      this.subjectList =res;
      this.loading = false;
      console.log(this.subjectList);
    });
  }

  create(){
    this.createOrEditSubjectModal.show();   
  }

  getSubject(){
    this.getAll();
  }

  deleteSubject(id:number){
    this.service.delete(id).subscribe(
      (res: any) => {
        this.getAll();
        this.toastr.success('Deleted!', 'Test Deleted successful.');}
    );
  }

}
