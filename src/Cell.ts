export class Cell {
	block: HTMLElement
	marked = false
	food = false
	constructor(block: HTMLElement) {
		this.block = block
	}
	mark() {
		this.marked = true
		this.block.classList.add('marked')
	}

	unmark() {
		this.marked = false
		this.block.classList.remove('marked')
	}
	placeFood() {
		this.food = true
		this.block.classList.add('food')
	}

	eatFood() {
		this.food = false
		this.block.classList.remove('food')
	}
}
