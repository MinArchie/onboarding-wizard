import { Component, Input, OnInit } from '@angular/core';
import { OnboardingStep } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  imports: [CommonModule]
})
export class ProgressBarComponent implements OnInit {
  @Input() steps: OnboardingStep[] = [];
  @Input() currentStep: number = 1;

  constructor() {}

  ngOnInit(): void {}

  getProgressPercentage(): number {
    if (this.steps.length === 0) return 0;
    return (this.currentStep / this.steps.length) * 100;
  }

  getStepClass(step: OnboardingStep): string {
    const baseClass = 'step-indicator';
    
    if (step.isCompleted) {
      return `${baseClass} completed`;
    } else if (step.isActive) {
      return `${baseClass} active`;
    } else {
      return `${baseClass} inactive`;
    }
  }
}