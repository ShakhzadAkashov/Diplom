import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { LectureComponent } from './lecture/lecture.component';
import { LectureListComponent } from './lecture/lecture-list/lecture-list.component';
import { TestListComponent } from './test/test-list/test-list.component';
import { TestComponent } from './test/test.component';
import {TestingComponent} from './test/testing/testing.component';
import { SubjectComponent } from './subject/subject.component';
import { UsersComponent } from './admin/users/users.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { StudentSubjectComponent } from './student-subject/student-subject.component';
import { StudentLectureComponent } from './lecture/student-lecture/student-lecture.component';
import { StudentTestComponent } from './test/student-test/student-test.component';
import { StudentPracticeListComponent } from './practice/student-practice-list/student-practice-list.component';
import { StudentPracticeComponent } from './practice/student-practice/student-practice.component';
import { StudentPracticeListForTeacherComponent } from './practice/student-practice-list-for-teacher/student-practice-list-for-teacher.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ResetPasswordModalComponent } from './user/reset-password/reset-password-modal/reset-password-modal.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {
    path: 'user', component:UserComponent,
    children:[
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: 'resetPswd', component: ResetPasswordComponent,
    children:[
      {path: 'resetPassword', component: ResetPasswordModalComponent}
    ]
  },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard],children:[
    {path: 'forbidden', component: ForbiddenComponent},
    {path: 'cabinet', component: CabinetComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher','Student']}  },
    {path: 'lecture', component: LectureComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher','Student']} },
    {path: 'lectureList', component: LectureListComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher']} },
    {path: 'studentLecture', component: StudentLectureComponent, canActivate:[AuthGuard], data: {permittedRoles:['Student']} },
    {path: 'testList', component: TestListComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher']} },
    {path: 'test', component: TestComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher']} },
    {path: 'studentTest', component: StudentTestComponent, canActivate:[AuthGuard], data: {permittedRoles:['Student']} },
    {path: 'testing', component: TestingComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Student','Teacher']} },
    {path: 'subject', component: SubjectComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Student','Teacher']} },
    {path: 'studentSubject', component: StudentSubjectComponent, canActivate:[AuthGuard], data: {permittedRoles:['Student']} },
    {path: 'practice', component: PracticeListComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher']} },
    {path: 'studentPracticeList', component: StudentPracticeListComponent, canActivate:[AuthGuard], data: {permittedRoles:['Student']} },
    {path: 'studentPracticeListForTeacher', component: StudentPracticeListForTeacherComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Teacher']} },
    {path: 'statistics', component: StatisticsComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Student','Teacher']} },
    {path: 'studentPractice', component: StudentPracticeComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin','Student','Teacher']} },
    {path: 'admin/users', component: UsersComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']} }
  ]},
  //{path: 'forbidden', component: ForbiddenComponent},
  {path: 'adminpanel', component: AdminPanelComponent, canActivate:[AuthGuard], data: {permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
