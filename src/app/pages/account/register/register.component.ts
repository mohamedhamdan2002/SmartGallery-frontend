import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shard/material.module';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterViewModel } from '../../../shard/models/RegisterViewModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  form: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if(this.form.valid) {
      this.authService.register(this.form.value as RegisterViewModel).subscribe(res => {
        this.toastrService.success("Registration done Successfully");
        this.router.navigateByUrl('home')
      });
    }
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get address() {
    return this.form.get('address');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
}
