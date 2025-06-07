import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { OnboardingService } from '../../services/onboarding.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class OnboardingComponent implements OnInit, OnDestroy {
  currentStep = 1;
  form!: FormGroup;
  steps: any = []
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit(): void {

    this.steps = this.onboardingService.getSteps();

    // Subscribe to route params to get current step
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.currentStep = +params['stepId'] || 1;
      this.onboardingService.setCurrentStep(this.currentStep);
      this.initializeForm();
    });

    // Load existing data
    this.onboardingService.userData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (this.form) {
        this.form.patchValue(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    switch (this.currentStep) {
      case 1:
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(2)]],
          email: ['', [Validators.required, Validators.email]]
        });
        break;
      case 2:
        this.form = this.fb.group({
          companyName: ['', Validators.required],
          industry: ['', Validators.required],
          companySize: ['', Validators.required]
        });
        break;
      case 3:
        this.form = this.fb.group({
          theme: ['light', Validators.required],
          dashboardLayout: ['cards', Validators.required]
        });
        break;
    }
  }

  nextStep(): void {
    if (this.form.valid) {
      this.onboardingService.updateUserData(this.form.value);
      this.onboardingService.completeStep(this.currentStep);
      
      if (this.currentStep < 3) {
        this.router.navigate(['/onboarding/step', this.currentStep + 1]);
      } else {
        this.completeOnboarding();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.onboardingService.updateUserData(this.form.value);
      this.router.navigate(['/onboarding/step', this.currentStep - 1]);
    }
  }

  completeOnboarding(): void {
    if (this.onboardingService.isOnboardingComplete()) {
      localStorage.setItem('onboardingCompleted', 'true');
      this.router.navigate(['/dashboard']);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }
}