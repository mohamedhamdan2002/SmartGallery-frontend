import { Component, computed, OnInit, signal } from '@angular/core';
import { ServiceItemComponent } from '../service-item/service-item.component';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { ServiceFilterComponent } from '../service-filter/service-filter.component';
import {
  MaterialModule,
  Pagination,
  ServiceParameters,
  ServiceService
} from 'shardLib';
import { FormsModule } from '@angular/forms';
import { FilterSortService } from '../../services/filter-sort.service';
@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    FormsModule,
    ServiceItemComponent,
    PaginationModule,
    MaterialModule,
    ServiceFilterComponent
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent implements OnInit {
  openFilter = signal<boolean>(true);
  services!: Pagination;
  searchTerm!: string;
  constructor(
    private serviceService: ServiceService,
    private filterSortService: FilterSortService
  ) {
  }
  ngOnInit(): void {
    this.filterSortService.filterSort$.subscribe(filterSort => {
      console.log(filterSort);
      this.loadServices(filterSort);
    });
    this.loadServices();
  }
  loadServices(filterSort?: { categoriesIds: number[], sort: string }) {
    const params = this.serviceService.getServiceParams();
    if(filterSort) {
      params.categoriesIds = filterSort.categoriesIds;
      params.sort = filterSort.sort;
    }
    this.serviceService.setServiceParams(params);
    this.serviceService.getAllServices().subscribe((res: any) => {
      this.services = res;
    });
  }
  // onCategorySelected(categoriesIds: number) {
  //   const params = this.serviceService.getServiceParams();
  //   params.categor = categoryId;
  //   params.pageNumber = 1;
  //   this.uploadServices(params);
  // }
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
}
