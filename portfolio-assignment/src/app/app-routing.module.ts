import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {path:"\login",component:LoginFormComponent},
  {path:"\portfolio",component:PortfolioPageComponent},
  {path:"\sign_up",component:RegisterFormComponent},
  {path:"**",component:LoginFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
