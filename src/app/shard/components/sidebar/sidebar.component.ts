import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faList, faBorderAll, faTableList, faAnglesLeft, faBars } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faList = faList;
  faBorderAll = faBorderAll;
  faTableList = faTableList;
  collapse = signal<boolean>(true);
  sideBarIcon = computed(() => {
    if(this.collapse())
      return faBars;
    return faAnglesLeft;
  });
}
