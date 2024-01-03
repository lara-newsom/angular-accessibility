import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  imports: [
    RouterOutlet,
    SideMenuComponent,
  ]
})
export class ProductViewComponent{
  @Input() set categoryId(val: string) {
    this.productService.selectedCategory.set(val);
  }

  protected readonly productService = inject(ProductService);
}


