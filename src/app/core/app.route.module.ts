import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from '../chatroom/chatroom.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UserComponentComponent } from '../user-component/user-component.component';
import { authGuard } from '../guards/auth.guard';
import { PaymentComponent } from '../payment/payment.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fileUpload', component: FileUploadComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
