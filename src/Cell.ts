export class Cell {
	block: HTMLElement;
	marked = false;
	constructor(block: HTMLElement) {
		this.block = block;
	}
	mark() {
		this.marked = true;
		this.block.classList.add('marked');
	}

	unmark() {
		this.marked = false;
		this.block.classList.remove('marked');
	}
}
