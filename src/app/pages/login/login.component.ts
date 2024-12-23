import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

export interface User {
  id: number;
  email: string;
  password: string;
  role: "admin" | "livreur" | "client";
}

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h4 class="text-center mb-4">Login</h4>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Email Field -->
          <div class="form-group mb-3">
            <input
              formControlName="email"
              type="email"
              placeholder="Email"
              class="form-control custom-input"
              id="email"
            />
            <div
              *ngIf="
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
              class="text-danger"
            >
              Valid email is required.
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group mb-3">
            <input
              formControlName="password"
              type="password"
              placeholder="Password"
              class="form-control custom-input"
              id="password"
            />
            <div
              *ngIf="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
              class="text-danger"
            >
              Password is required.
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary btn-block custom-button"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>

          <!-- Links -->
          <div class="text-center mt-3">
            <a href="#" class="forgot-link">Forgot password</a>
          </div>
          <div class="text-center mt-3">
            <span>
              Don't have an account?
              <a href="#" class="register-link">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .login-card {
        width: 400px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background: #fff;
      }
      .custom-input {
        border-radius: 4px;
      }
      .custom-button {
        width: 100%;
      }
      .forgot-link,
      .register-link {
        color: #007bff;
        text-decoration: none;
      }
    `,
  ],
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the Form
  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  // Handle Form Submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log("Form Submitted:", formData);
      this.router.navigate(["colis"]);
    } else {
      console.log("Form is invalid");
    }
  }
}
