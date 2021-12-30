import { ShelfItem } from '../interfaces';

export default class Shelf<T extends ShelfItem = ShelfItem> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public find(title: string): T {
        return this.items.find(item => item.title === title);
    }

    public printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }

    public getFirst(): T {
        return this.items[0];
    }
}