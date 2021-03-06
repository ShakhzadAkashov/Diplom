import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Lecture} from '../../models/Lecture';
import { URI } from '../../models/URI';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http:HttpClient) { }

  //readonly BaseURI = 'https://localhost:44352/api';
  private readonly BaseURI = URI.BaseURI;

  createLecture(lecture:Lecture){
    return this.http.post(this.BaseURI + '/Lecture/CreateLecture',lecture);
  }

  createOrEdit(lecture:Lecture){
    return this.http.post(this.BaseURI + '/Lecture/CreateOrEdit',lecture);
  }

  getAll(filterText: string){
    return this.http.get(this.BaseURI + '/Lecture/GetAllLecturesForUser',{params: {filterText:filterText}});
  }

  getAllForAdmin(filterText: string){
    return this.http.get(this.BaseURI + '/Lecture/GetAllLecturesForAdmin',{params: {filterText:filterText}});
  }

  getAllForStudent(filterText: string){
    return this.http.get(this.BaseURI + '/Lecture/GetAllLecturesForStudent',{params: {filterText:filterText}});
  }

  getById(Id){
    return this.http.get(this.BaseURI + '/Lecture/GetAllLecturesById',{params: {id:Id}});
  }

  delete(Id){
    return this.http.delete(this.BaseURI + '/Lecture/Delete',{params: {id:Id}});
  }

}
