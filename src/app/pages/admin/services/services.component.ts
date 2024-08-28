import { Component, inject } from '@angular/core';
import { IService } from '../../../shard/models/service';
import { ServiceItemComponent } from '../../service-page/service-item/service-item.component';
import { map, Observable } from 'rxjs';
import { ServiceService } from '../../../core/services/service.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MaterialModule } from '../../../shard/material.module';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FontAwesomeModule,
    MaterialModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  icons =  { edit: faPen, delete: faTrashCan };
  columnsToDisplay = ['No', 'Service', 'Category', 'Cost', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<IService>();
  service = inject(ServiceService);
  ngOnInit(): void {
    this.loadServices();
  }
  loadServices() {
    this.service.getAllServices().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement!: PeriodicElement | null;
}





