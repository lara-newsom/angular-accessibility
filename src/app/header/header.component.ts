import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('products') products!: ElementRef;
  readonly LINKS = LINKS;
  readonly ROUTE_TOKENS = ROUTE_TOKENS;

  readonly menuItemOne = 'Menu Item One';
  readonly logoUrl = '../../assets/images/justlikepeople.png';

  closeMenu(){
    this.products.nativeElement.checked = false;
    console.log('menu was closed!');
  }

  selectCategory(name: string){
    this.products.nativeElement.checked = false;
    console.log(name, ' was clicked!');
  }
}
