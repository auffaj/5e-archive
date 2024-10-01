import { Routes } from '@angular/router';
import { QuickReferenceComponent } from './quick-reference/quick-reference.component';
import { SplashPageComponent } from './splash-page/splash-page.component';

export const routes: Routes = [{
    path:'quick-reference',
    component:QuickReferenceComponent
},{
    path:'landing',
    component: SplashPageComponent
},{
    path:'',
    redirectTo:"/landing",
    pathMatch:"full"
}];
