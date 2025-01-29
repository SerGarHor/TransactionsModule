import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { FormPatAud } from './components/form-pat-aud/form-pat-aud.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'form',
    component: FormPatAud
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
