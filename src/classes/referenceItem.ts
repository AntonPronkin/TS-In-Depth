/* eslint-disable no-underscore-dangle */

import { timeout } from '../decorators';

export default abstract class ReferenceItem {
    /*
    private title: string;
    private year: number;

    constructor(newTitle: string, newYear: number) {
        console.log('Creating a new ReferenceItem...');

        this.title = newTitle;
        this.year = newYear;
    }
    */

    #id: number;
    private _publisher: string;

    public static department: string = 'Default department';

    constructor(id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    @timeout(2000)
    public printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department is ${ReferenceItem.department}`);
    }

    public get publisher() {
        return this._publisher.toUpperCase();
    }

    public set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    public getID(): number {
        return this.#id;
    }

    public abstract printCitation();
}