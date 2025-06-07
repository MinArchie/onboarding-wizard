import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData, OnboardingStep } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private readonly STORAGE_KEY = 'onboardingData';
  private readonly COMPLETED_KEY = 'onboardingCompleted';
  
  private userDataSubject = new BehaviorSubject<Partial<UserData>>({});
  private currentStepSubject = new BehaviorSubject<number>(1);
  private stepsSubject = new BehaviorSubject<OnboardingStep[]>([]);
  
  public userData$ = this.userDataSubject.asObservable();
  public currentStep$ = this.currentStepSubject.asObservable();
  public steps$ = this.stepsSubject.asObservable();

  private initialSteps: OnboardingStep[] = [
    { 
      id: 1, 
      title: 'Personal Information', 
      description: 'Tell us about yourself', 
      isCompleted: false, 
      isActive: true 
    },
    { 
      id: 2, 
      title: 'Business Information', 
      description: 'About your company', 
      isCompleted: false, 
      isActive: false 
    },
    { 
      id: 3, 
      title: 'Preferences', 
      description: 'Customize your experience', 
      isCompleted: false, 
      isActive: false 
    }
  ];

  constructor() {
    this.initializeSteps();
    this.loadFromStorage();
  }

  private initializeSteps(): void {
    this.stepsSubject.next([...this.initialSteps]);
  }

  updateUserData(data: Partial<UserData>): void {
    const currentData = this.userDataSubject.value;
    const updatedData = { ...currentData, ...data };
    this.userDataSubject.next(updatedData);
    this.saveToStorage(updatedData);
  }

  setCurrentStep(step: number): void {
    this.currentStepSubject.next(step);
    this.updateStepStates(step);
  }

  private updateStepStates(currentStep: number): void {
    const steps = this.stepsSubject.value.map(step => ({
      ...step,
      isActive: step.id === currentStep
    }));
    this.stepsSubject.next(steps);
  }

  getSteps(): OnboardingStep[] {
    return this.stepsSubject.value;
  }

  completeStep(stepId: number): void {
    const steps = this.stepsSubject.value.map(step => 
      step.id === stepId ? { ...step, isCompleted: true } : step
    );
    this.stepsSubject.next(steps);
  }

  isOnboardingComplete(): boolean {
    return this.stepsSubject.value.every(step => step.isCompleted);
  }

  getCurrentUserData(): Partial<UserData> {
    return this.userDataSubject.value;
  }

  markOnboardingComplete(): void {
    localStorage.setItem(this.COMPLETED_KEY, 'true');
  }

  isOnboardingCompleted(): boolean {
    return localStorage.getItem(this.COMPLETED_KEY) === 'true';
  }

  resetOnboarding(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.COMPLETED_KEY);
    this.userDataSubject.next({});
    this.initializeSteps();
    this.setCurrentStep(1);
  }

  private saveToStorage(data: Partial<UserData>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.userDataSubject.next(data);
        
        // Update completed steps based on saved data
        this.updateCompletedStepsFromData(data);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  private updateCompletedStepsFromData(data: Partial<UserData>): void {
    const steps = this.stepsSubject.value.map(step => {
      let isCompleted = false;
      
      switch (step.id) {
        case 1:
          isCompleted = !!(data.name && data.email);
          break;
        case 2:
          isCompleted = !!(data.companyName && data.industry && data.companySize);
          break;
        case 3:
          isCompleted = !!(data.theme && data.dashboardLayout);
          break;
      }
      
      return { ...step, isCompleted };
    });
    
    this.stepsSubject.next(steps);
  }
}