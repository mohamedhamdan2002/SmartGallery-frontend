import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../shard/models/category';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { ServiceItemComponent } from './service-item/service-item.component';
import { IService } from '../../shard/models/service';
import { ServiceService } from '../../core/services/service.service';
import { ServiceParameters } from '../../shard/models/ServiceParameters';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { IPagination } from '../../shard/models/pagination';
@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [
    CommonModule,
    ServiceItemComponent,
    FormsModule,
    PaginationModule
  ],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent implements OnInit {
  categories: ICategory[] = [];
  services!: IPagination;
  serviceParams: ServiceParameters;
  searchTerm!: string;
  selectedSort: string = 'name';
  constructor(
    private categoryService: CategoryService,
    private serviceService: ServiceService
  ) {
    this.serviceParams = this.serviceService.getServiceParams();
  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadServices();
  }
  loadCategories() {
    this.categoryService.getAllCategory().subscribe((res: any )=> {
      this.categories = [{ id:0, name:'All'}, ...res];
    });
  }
  loadServices() {
    this.serviceService.getAllServices().subscribe((res: any) => {
      this.services = res;
    });
  }
  onCategorySelected(categoryId: number) {
    const params = this.serviceService.getServiceParams();
    params.categoryId = categoryId;
    params.pageNumber = 1;
    this.uploadServices(params);
  }
  onSearch() {
    const params = this.serviceService.getServiceParams();
    params.search = this.searchTerm;
    params.pageNumber = 1;
    this.uploadServices(params);
  }
  private uploadServices(params: ServiceParameters) {
    this.serviceService.setServiceParams(params);
    this.loadServices();
  }
  onPageChanges(pageNumber: number) {
    const params = this.serviceService.getServiceParams();
    console.log(pageNumber);
    if(pageNumber != params.pageNumber)
    {
      params.pageNumber = pageNumber;
      this.uploadServices(params);
    }
  }
  onSortSelected() {
    const params = this.serviceService.getServiceParams();

      params.sort = this.selectedSort;
      params.pageNumber = 1;
      this.uploadServices(params);
  }
}
