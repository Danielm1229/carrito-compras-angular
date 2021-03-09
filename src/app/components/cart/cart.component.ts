import { Component, OnInit } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Array<IItem>
  public totalPrice: number = 0;
  public totalQuantity: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.currentDataCart$.subscribe(a => {
      this._cartService.loadCart();
      this.items = this._cartService.getItems();
      this.totalQuantity = this.items.length;
      this.totalPrice = this.items.reduce((sum, current) => sum + (current.price * current.quantity), 0);
    })
  }

  public remove(producto: IItem) {
    this._cartService.removeElementCart(producto);
  }

}
