import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OnboardingGuard } from './guards/onboarding.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/onboarding/step/1', pathMatch: 'full' },
  { 
    path: 'onboarding/step/:stepId', 
    component: OnboardingComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [OnboardingGuard]
  },
  { path: '**', redirectTo: '/onboarding/step/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }