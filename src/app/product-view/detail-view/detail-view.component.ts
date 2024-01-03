import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  imports: [
    NgFor,
    NgIf,
    CurrencyPipe,
  ]
})
export class DetailViewComponent {
  @Input() set productId(val: string) {
    this.productService.selectedProductId.set(val);
  }
  private readonly productService = inject(ProductService);

  readonly selectedProduct = this.productService.selectedProduct;
}

