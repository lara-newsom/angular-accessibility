import { render, screen, within } from '@testing-library/angular';
import { AddToCartButtonComponent } from './add-to-cart-button.component';
import { CartService } from '../../services/cart.service';
import { signal } from '@angular/core';
import { userEvent } from '@testing-library/user-event';

describe('AddToCartButtonComponent', () => {
  async function setup(
    quantity = 0,
    numberOnly?: boolean
  ) {
    const productId = 'puppy-pants';

    const mockCartService = {
      cartItems: signal({
        [productId]: { quantity }
      }),
      addCartItem: jest.fn(),
      decrementCartItem: jest.fn(),
    };

    const user = userEvent.setup();

    const { fixture } = await render(AddToCartButtonComponent, {
      providers: [
        {
          provide: CartService,
          useValue: mockCartService
        }
      ],
      componentInputs: {
        productId,
        numberOnly,
      }
    });

    return {
      fixture,
      mockCartService,
      user,
      productId,
    };
  }

  it('displays default visual messages when no items are in the cart and invokes correct methods', async() => {
    // default setup is quantity: 0, numberOnly: undefined
    const { user, mockCartService, productId } = await setup();

    // obtain button references
    const buttons = screen.getAllByRole('button');
    const subtractButton = buttons[0];
    const middleButton = buttons[1];
    const addButton = buttons[2];

    // expect correct visual messages
    expect(buttons.length).toBe(3);
    expect(subtractButton).toHaveTextContent('-');
    expect(middleButton).toHaveTextContent('Add to cart');
    expect(addButton).toHaveTextContent('+');

    // click buttons
    await user.click(subtractButton);
    expect(mockCartService.decrementCartItem).toHaveBeenCalledTimes(1);
    expect(mockCartService.decrementCartItem).toHaveBeenNthCalledWith(1, productId);

    await user.click(middleButton);
    expect(mockCartService.addCartItem).toHaveBeenCalledTimes(1);
    expect(mockCartService.addCartItem).toHaveBeenNthCalledWith(1, productId);

    await user.click(addButton);
    expect(mockCartService.addCartItem).toHaveBeenCalledTimes(2);
    expect(mockCartService.addCartItem).toHaveBeenNthCalledWith(2, productId);
  });
});
