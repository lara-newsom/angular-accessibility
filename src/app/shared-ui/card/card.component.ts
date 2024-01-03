import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { ROUTE_TOKENS } from '../../models/route-tokens';

@Component({
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input({ required: true }) product!: Product;
  readonly ROUTE_TOKENS = ROUTE_TOKENS;
}
