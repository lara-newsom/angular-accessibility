import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AddToCartButtonComponent } from '../../shared-ui/add-to-cart-button/add-to-cart-button.component';

@Component({
  standalone: true,
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  imports: [
    CurrencyPipe,
    AddToCartButtonComponent,
  ]
})
export class DetailViewComponent {
  @Input() set productId(val: string) {
    this.productService.selectedProductId.set(val);
  }
  private readonly productService = inject(ProductService);
  protected readonly cartService = inject(CartService);

  readonly selectedProduct = this.productService.selectedProduct;
}

