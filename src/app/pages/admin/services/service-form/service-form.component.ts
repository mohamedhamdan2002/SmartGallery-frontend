import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../shard/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IService } from '../../../../shard/models/service';
import { ICategory } from '../../../../shard/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { ServiceService } from '../../../../core/services/service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {
  status: string = 'Create';
  service?: IService;
  categories$!: Observable<ICategory[]>;
  formBuilder = inject(FormBuilder);
  categoryService = inject(CategoryService);
  serviceServices = inject(ServiceService);
  form: FormGroup = this.formBuilder.group({
    name: [''],
    cost: [''],
    description: [''],
    pictureUrl: [''],
    categoryId: ['']
  });
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();

  }
  onSubmit() {
    console.log(this.form.value);
  }
}
