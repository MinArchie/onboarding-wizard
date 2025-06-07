import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OnboardingService } from '../services/onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(
    private onboardingService: OnboardingService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isCompleted = this.onboardingService.isOnboardingCompleted();
    
    if (!isCompleted) {
      return this.router.createUrlTree(['/onboarding/step/1']);
    }
    
    return true;
  }
}