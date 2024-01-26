import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(
    private readonly router: Router
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
        const content = document.querySelector<HTMLElement>('#productDetail');
        if(content){
          content.focus();
        }
      }
    )
  }
}


