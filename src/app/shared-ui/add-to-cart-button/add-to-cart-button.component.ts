import { Component, Input, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  protected readonly cartService = inject(CartService);
  protected readonly _productId = signal<string>('');

  @Input({required: true}) set productId(id: string) {
    this._productId.set(id);
  }

  protected readonly addToCartMessage = computed(() => {
    const total = this.cartService.cartItems()[this._productId()]?.quantity || 0;

    return total ? `Add one to the ${total} in the cart`
    : 'Add one to cart';
  });

  protected buttonMessage = computed(() => {
    const total = this.cartService.cartItems()[this._productId()]?.quantity || 0;

    return total
      ? `${total} in cart`
      : 'Add to cart';
  });
}
