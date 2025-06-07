# OnboardingWizard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Demo

https://github.com/user-attachments/assets/1d14fc15-f9f1-4287-a034-a10537525b1d

## Development server

To start a local development server, run:

```bash
npm install
```

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Features

- ✅ **3-Step Onboarding Flow**
  - Collect personal information
  - Gather business details
  - Customize user preferences (theme & layout)

- 📊 **User Dashboard**
  - Displays key stats: team size, projects, notifications
  - Weekly progress bar visualization
  - Personalized greeting using user data

- 📁 **State Management**
  - Centralized service (`OnboardingService`) to manage onboarding steps and persist user data using `BehaviorSubject`.

- 💅 **Clean UI**
  - Tailwind CSS for styling and layout
  - Responsive and accessible form elements

## Tech Stack

- **Angular 16+**
- **RxJS** for reactive state management
- **Tailwind CSS** for design
- **Reactive Forms** for form control and validation
- **TypeScript**


## 📂 Project Structure
```
src/
│
├── app/
│ ├── dashboard/
│ │ ├── dashboard.component.ts
│ │ ├── dashboard.component.html
│ │ └── dashboard.component.css
│ ├── onboarding/
│ │ ├── onboarding.component.ts
│ │ ├── onboarding.component.html
│ │ └── onboarding.component.css
│ ├── services/
│ │ └── onboarding.service.ts
│ ├── models/
│ │ └── user.model.ts
│ ├── app-routing.module.ts
│ └── app.module.ts
```

## State Management

- `OnboardingService` handles:
  - Current step tracking
  - Step completion status
  - User data via `BehaviorSubject`
  - Storage and retrieval of onboarding status
