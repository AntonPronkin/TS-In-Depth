import ReferenceItem from '.';

export default class Encyclopedia extends ReferenceItem {
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
}