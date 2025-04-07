import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IlistItems.interface';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseListItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseListItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }
  public getIputAndAddItem(value: IListItems) {
    localStorage.setItem(
      '@my-list', JSON.stringify([...this.#setListItems() ,value])
    )

    return this.#setListItems.set(this.#parseListItems());
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseListItems());
  }
}
