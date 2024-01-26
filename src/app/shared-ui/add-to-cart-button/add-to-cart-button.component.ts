import { Component, Input, booleanAttribute, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { JlpButtonDirective } from '../jlp-button.directive';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [
    JlpButtonDirective,
  ],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  protected readonly cartService = inject(CartService);
  protected readonly _productId = signal<string>('');

  @Input({required: true}) set productId(id: string) {
    this._productId.set(id);
  }

  @Input({ transform: booleanAttribute}) numberOnly: boolean = false;

  protected readonly addToCartMessage = computed(() => {
    const total = this.cartService.cartItems()[this._productId()]?.quantity || 0;

    return total ? `Add one to the ${total} in the cart`
    : 'Add one to cart';
  });

  protected buttonMessage = computed(() => {
    const total = this.cartService.cartItems()[this._productId()]?.quantity || 0;

    return total
      ? this.numberOnly
        ? total
        : `${total} in cart`
      : 'Add to cart';
  });
}
