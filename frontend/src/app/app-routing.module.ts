import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateTestComponent } from './translate-test/translate-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverallstatusComponent } from './overallstatus/overallstatus.component';
const routes: Routes = [
  {
    path:" ",
    component:AppComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"overallstatus",
    component:OverallstatusComponent
  },
  {
    path:"statuscheck/:id",
    component:TranslateTestComponent,
    
  },
  {
    path:"statuscheck",
    component:TranslateTestComponent,
    
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
