import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      theme: ['light', Validators.required],
      dashboardLayout: ['cards', Validators.required]
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
