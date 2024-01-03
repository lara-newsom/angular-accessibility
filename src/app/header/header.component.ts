import { Component } from '@angular/core';
import { LINKS } from '../models/category';
import { ROUTE_TOKENS } from '../models/route-tokens';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
  ]
})
export class HeaderComponent {
  showMenu = false;
  readonly LINKS = LINKS;
  readonly ROUTE_TOKENS = ROUTE_TOKENS;

  readonly menuItemOne = 'Menu Item One';
  readonly logoUrl = '../../assets/images/justlikepeople.png';

  toggleMenu(){
    this.showMenu = !this.showMenu;
    console.log('menu was closed!');
  }

  selectCategory(name: string){
    this.showMenu = false;
    console.log(name, ' was clicked!');
  }
}
