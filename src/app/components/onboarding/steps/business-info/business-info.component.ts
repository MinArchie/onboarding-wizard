// src/app/components/onboarding/steps/business-info/business-info.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent {
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      companySize: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form);
    } else {
      this.form.markAllAsTouched();
    }
  }

  goBack() {
    this.back.emit();
  }
}
