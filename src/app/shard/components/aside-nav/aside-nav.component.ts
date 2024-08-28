import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside-nav',
  standalone: true,
  imports: [],
  templateUrl: './aside-nav.component.html',
  styleUrl: './aside-nav.component.css'
})
export class AsideNavComponent {
  @Input() title: string = '';
  @Input() items: Array<any> = new Array<any>();
  @Input() activePredicate!: boolean;
  onItemSelected(key: any) {
    
  }
}
