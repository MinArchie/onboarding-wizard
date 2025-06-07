import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DashboardStats, ProgressData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    const mockStats: DashboardStats = {
      teamMembers: Math.floor(Math.random() * 50) + 5,
      activeProjects: Math.floor(Math.random() * 20) + 3,
      notifications: Math.floor(Math.random() * 10) + 1
    };
    
    return of(mockStats);
    // return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getWeeklyProgress(): Observable<ProgressData[]> {
    const mockData: ProgressData[] = [
      { day: 'Mon', progress: Math.floor(Math.random() * 40) + 20 },
      { day: 'Tue', progress: Math.floor(Math.random() * 40) + 30 },
      { day: 'Wed', progress: Math.floor(Math.random() * 40) + 40 },
      { day: 'Thu', progress: Math.floor(Math.random() * 40) + 50 },
      { day: 'Fri', progress: Math.floor(Math.random() * 40) + 60 },
      { day: 'Sat', progress: Math.floor(Math.random() * 30) + 45 },
      { day: 'Sun', progress: Math.floor(Math.random() * 40) + 70 }
    ];
    
    return of(mockData);
    // return this.http.get<ProgressData[]>(`${this.apiUrl}/dashboard/progress`);
  }

  saveUserProfile(userData: any): Observable<any> {
    console.log('Saving user profile:', userData);
    return of({ success: true, message: 'Profile saved successfully' });
    // return this.http.post(`${this.apiUrl}/user/profile`, userData);
  }

  updateUserPreferences(preferences: any): Observable<any> {
    console.log('Updating user preferences:', preferences);
    return of({ success: true, message: 'Preferences updated successfully' });
    // return this.http.put(`${this.apiUrl}/user/preferences`, preferences);
  }
}