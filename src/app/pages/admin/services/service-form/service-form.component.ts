import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../shard/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IService } from '../../../../shard/models/service';
import { ICategory } from '../../../../shard/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { ServiceService } from '../../../../core/services/service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
  id?: number | null;
  categories$!: Observable<ICategory[]>;
  formBuilder = inject(FormBuilder);
  categoryService = inject(CategoryService);
  serviceServices = inject(ServiceService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  readonly toastrService = inject(ToastrService);
  form: FormGroup = this.formBuilder.group({
    name: [''],
    cost: [''],
    description: [''],
    categoryId: ['']
  });
  selectedPicture!: File;
  pictureSrc: string | null = null;

  constructor() {
    const serviceId = this.activatedRoute.snapshot.paramMap.get('id');
    if(serviceId) {
      this.id = +serviceId;
      this.status = "Edit";
    }
    console.log(serviceId);
  }
  ngOnInit(): void {

    if(this.id)
      this.setServiceForUpdate(this.id);
    this.categories$ = this.categoryService.getAllCategory();

  }
  setServiceForUpdate(id: number) {
    this.serviceServices.getServiceById(id).subscribe(res => {
      console.log(res);
      this.form.patchValue(res);
      this.pictureSrc = res.pictureUrl;
    });
  }
  onPictureSelected(event: any) {
    console.log(event.target.files[0]);
    this.selectedPicture = event.target.files[0];
    if(this.selectedPicture)
      this.pictureSrc = URL.createObjectURL(this.selectedPicture);
    else
      this.pictureSrc = null;

  }
  onSubmit() {
    console.log(this.form.value);
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('cost', this.form.get('cost')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('categoryId', this.form.get('categoryId')?.value);

    formData.append('picture', this.selectedPicture, this.selectedPicture.name);
    console.log(formData);
    if(this.id)
      this.edit(formData);
    else
      this.create(formData);
  }
  private create(formData: FormData) {
    this.serviceServices.createService(formData).subscribe((res) => {
      this.router.navigateByUrl("/admin/services");
      this.toastrService.success("Service was Created Successfully");
    });
  }
  private edit(formData: FormData) {
    this.serviceServices.updateService(this.id || 0, formData).subscribe((res) => {
      this.router.navigateByUrl("/admin/services");
      this.toastrService.success("Service was Updated Successfully");
    });
  }
}
