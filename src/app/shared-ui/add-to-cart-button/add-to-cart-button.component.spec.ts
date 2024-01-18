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

  it('displays default visual messages when some items are in the cart', async() => {
    const quantity = 3;
    const numberOnly = undefined;
    await setup(quantity, numberOnly);

    // obtain button references
    const buttons = screen.getAllByRole('button');
    const subtractButton = buttons[0];
    const middleButton = buttons[1];
    const addButton = buttons[2];

    // expect correct visual messages
    expect(buttons.length).toBe(3);
    expect(subtractButton).toHaveTextContent('-');
    expect(middleButton).toHaveTextContent(`${quantity} in cart`);
    expect(addButton).toHaveTextContent('+');
  });

  it('displays numberOnly visual messages when no items are in the cart', async() => {
    const quantity = 0;
    const numberOnly = true;
    await setup(quantity, numberOnly);

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
  });

  it('displays numberOnly visual messages when some items are in the cart', async() => {
    const quantity = 3;
    const numberOnly = true;
    await setup(quantity, numberOnly);

    // obtain button references
    const buttons = screen.getAllByRole('button');
    const subtractButton = buttons[0];
    const middleButton = buttons[1];
    const addButton = buttons[2];

    // expect correct visual messages
    expect(buttons.length).toBe(3);
    expect(subtractButton).toHaveTextContent('-');
    expect(middleButton).toHaveTextContent(`${quantity}`);
    expect(addButton).toHaveTextContent('+');
  });

  describe('Keyboard Navigation', () => {
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
      await user.tab();
      expect(subtractButton).toHaveFocus();
      await user.keyboard('[Enter]');
      expect(mockCartService.decrementCartItem).toHaveBeenCalledTimes(1);
      expect(mockCartService.decrementCartItem).toHaveBeenNthCalledWith(1, productId);

      await user.tab();
      expect(middleButton).toHaveFocus();
      await user.keyboard('[Enter]');
      expect(mockCartService.addCartItem).toHaveBeenCalledTimes(1);
      expect(mockCartService.addCartItem).toHaveBeenNthCalledWith(1, productId);

      await user.tab();
      expect(addButton).toHaveFocus();
      await user.keyboard('[Enter]');
      expect(mockCartService.addCartItem).toHaveBeenCalledTimes(2);
      expect(mockCartService.addCartItem).toHaveBeenNthCalledWith(2, productId);
    });
  });

  describe('Aria Attributes', () => {
    it('displays default aria messages when no items are in the cart', async() => {
      // default setup is quantity: 0, numberOnly: undefined
      await setup();

      // obtain button references
      const subtractButton = screen.getByRole('button', { name: 'Remove one from cart'});
      expect(subtractButton).toBeInTheDocument();

      const addButtons = screen.getAllByRole('button', { name: 'Add one to cart'});
      expect(addButtons.length).toBe(2);

      const ariaLiveElement = within(addButtons[0]).getByText('Add to cart');
      expect(ariaLiveElement).toHaveAttribute('aria-live', 'assertive');
    });

    it('displays default aria messages when some items are in the cart', async() => {
      const quantity = 9;
      await setup(quantity);

      // obtain button references
      const subtractButton = screen.getByRole('button', { name: 'Remove one from cart'});
      expect(subtractButton).toBeInTheDocument();

      const middleButton = screen.getByRole('button', { name: `Add one to the ${quantity} in the cart`});
      expect(middleButton).toBeInTheDocument();

      const addButton = screen.getByRole('button', { name: 'Add one to cart'});
      expect(addButton).toBeInTheDocument();
    });
  });
});
