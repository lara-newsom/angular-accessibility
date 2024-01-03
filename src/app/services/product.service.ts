import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { PRODUCTS } from '../models/product-data.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly selectedCategory = signal<string>(Category.ALL);
  readonly selectedProductId = signal<string | undefined>(undefined);
  readonly products = signal<Product[]>(PRODUCTS);


  readonly homeProducts = computed(() => {
    const middle = Math.floor(this.products().length / 2);

    return [this.products()[0], this.products()[middle], this.products()[this.products().length - 1]];
  });

  readonly filteredProducts = computed(() => {
    return this.selectedCategory() === Category.ALL
      ? this.products()
      : this.products().filter((product) => product.category.toLowerCase() === this.selectedCategory().toLowerCase())
  })

  readonly selectedProduct = computed(() => {
    return this.products().find((product) => product.id === this.selectedProductId()) || this.firstInCategory();
  });

  readonly firstInCategory = computed(() => this.filteredProducts()[0]);
}
