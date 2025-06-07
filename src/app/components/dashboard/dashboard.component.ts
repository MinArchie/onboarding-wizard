import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/onboarding.service';
import { UserData } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  userData: Partial<UserData> = {};
  
  teamMembers = 12;
  activeProjects = 8;
  notifications = 5;
  
  weeklyProgress = [
    { day: 'Mon', progress: 20 },
    { day: 'Tue', progress: 35 },
    { day: 'Wed', progress: 45 },
    { day: 'Thu', progress: 60 },
    { day: 'Fri', progress: 75 },
    { day: 'Sat', progress: 65 },
    { day: 'Sun', progress: 80 }
  ];

  constructor(private onboardingService: OnboardingService) {}

  ngOnInit(): void {
    this.onboardingService.userData$.subscribe(data => {
      this.userData = data;
    });
  }
}