import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'shardLib';
import { FilterSortService } from '../../services/filter-sort.service';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent implements OnInit {
  items = [
    { value: "name", name: "Name" },
    { value: "cost", name: "By Price" },
    { value: "costDesc", name: "By Price Desc" },
  ]
  sortControl = new FormControl(['name']);
  private filterSortService = inject(FilterSortService);
  ngOnInit(): void {
    this.sortControl.valueChanges.subscribe(selectedSort => {
      if(selectedSort)
        this.filterSortService.updateSort(selectedSort[0]);
    });
  }
}
