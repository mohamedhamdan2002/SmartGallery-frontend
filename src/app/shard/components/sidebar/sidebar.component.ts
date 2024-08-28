import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faList, faBorderAll, faTableList, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faList = faList;
  faBorderAll = faBorderAll;
  faTableList = faTableList;
  faAnglesLeft = faAnglesLeft;
}
