import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Array<IItem>>(null); //Definimos nuestro BehaviorSubject, este debe tener un valor inicial siempre
  public currentDataCart$ = this.cart.asObservable(); //Tenemos un observable con el valor actual del BehaviourSubject
  items = [];
  constructor() { }

  public changeCart(newData: IItem) {
    //Obtenemos el valor actual
    // let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if (this.items) {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = this.items.findIndex((obj => obj.id == newData.id));
      //Si ya cargamos uno aumentamos su cantidad
      if (objIndex != -1) {
        this.items[objIndex].quantity += 1;
        this.saveCart();
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        this.items.push(newData);
        this.saveCart();
      }
    }
    this.cart.next(this.items); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    this.saveCart();
    // this.items.push(newData);
    
    // localStorage.setItem('cart', JSON.stringify(listCart));
    // console.log(localStorage.getItem('cart'));
  }
  public removeElementCart(newData: IItem) {
    // //Obtenemos el valor actual de carrito
    // let listCart = this.cart.getValue();
    // //Buscamos el item del carrito para eliminar
    let objIndex = this.items.findIndex((obj => obj.id == newData.id));
    if (objIndex != -1) {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      this.items[objIndex].quantity = 1;
      //Eliminamos el item del array del carrito
      this.items.splice(objIndex, 1);
      this.saveCart();
    }
    this.cart.next(this.items); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    this.saveCart();
    // // localStorage.setItem('cart', JSON.stringify(listCart));
  }

  getItems() {
    return this.items;
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem("cart_items")) ?? [];
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart(items) {
    this.items = [];
    localStorage.removeItem("cart_items")
  }

  removeItem(item) {
    const index = this.items.findIndex(o => o.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }
}
