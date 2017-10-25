import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ScenarioComponent } from './scenario/scenario.component';


const routes: Routes = [
  {path: '', component: ScenarioComponent},
  {path: 'admin/login', loadChildren: './admin.module#AdminLazyModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
