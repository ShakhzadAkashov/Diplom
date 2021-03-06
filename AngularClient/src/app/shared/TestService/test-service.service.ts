import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from 'src/app/models/Test';
import { URI } from '../../models/URI';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  //readonly BaseURI = 'https://localhost:44352/api';
  private readonly BaseURI = URI.BaseURI;

  Create(test:Test){
    return this.http.post(this.BaseURI + '/Test/CreateTest',test);
  }
  CreateOrEdit(test:Test){
    return this.http.post(this.BaseURI + '/Test/CreateOrEdit',test);
  }

  getAll(filterText:string){
    return this.http.get(this.BaseURI + '/Test/GetAll',{params: {filterText:filterText}});
  }

  getAllforUser(filterText:string){
    return this.http.get(this.BaseURI + '/Test/GetAllForUser',{params: {filterText:filterText}});
  }

  getAllForStudent(filterText:string){
    return this.http.get(this.BaseURI + '/Test/GetAllForStudent',{params: {filterText:filterText}});
  }

  getById(Id){
    return this.http.get(this.BaseURI + '/Test/GetById',{params: {id:Id}});
  }

  delete(Id){
    return this.http.delete(this.BaseURI + '/Test/Delete',{params: {id:Id}});
  }

  checkTest(test:Test){
    return this.http.post(this.BaseURI + '/Test/CheckTest',test);
  }
}
