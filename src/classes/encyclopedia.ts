/* eslint-disable no-underscore-dangle */
import { positiveInteger } from '../decorators';
import ReferenceItem from './referenceItem';

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    public printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    public printCitation() {
        console.log(`${this.title} - ${this.year}`);
    }

    public get copies(): number {
        return this._copies;
    }

    @positiveInteger
    public set copies(value: number) {
        this._copies = value;
    }
}