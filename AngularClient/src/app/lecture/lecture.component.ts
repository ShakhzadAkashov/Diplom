import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Lecture } from '../models/Lecture';
import { LectureFile } from '../models/LectureFile';
import { LectureService } from '../shared/lectureService/lecture.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300px',
      maxHeight: '500px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


  constructor(private service:LectureService,private toastr: ToastrService,private router: Router) { }

  lecture: Lecture = new Lecture();
  lectureFiles:LectureFile[] = [];
  public response : {dbPath : ''}
  fileName = '';

  ngOnInit(): void {
  }

  public uploadFinished = (event) =>{
    this.response = event;
    let l = new LectureFile();
    l.Path  = this.response.dbPath;
    l.FileName = this.fileName;
    this.lectureFiles.push(l);
  }

  getFileName(event){
    this.fileName = '';
    this.fileName = event;
  }

  create(){
    this.lecture.LectureFiles = this.lectureFiles;
    this.service.createLecture(this.lecture).subscribe(
      (res: any) => {
      this.toastr.success('Created!', 'Lecture created successful.');
      this.router.navigateByUrl('/home/lectureList');}
    );
  }

  delete(fileName:string){
    this.lectureFiles = this.lectureFiles.filter(o => o.FileName !== fileName);
  }

}

