import App from './App.svelte'
import { Cell } from './Cell'

const rows = 10
const cols = 10
const size = 40
const updateTime = 150

let score = 0

const app = new App({
	target: document.body,
	props: {
		rows,
		cols,
		handleKeyPress,
		score,
	},
})

function updateScore() {
	document.getElementById('score').innerHTML = score.toString()
}

const grid: Array<Array<Cell>> = Array.from(Array(rows), () => Array(cols))

function createCell(i: number, j: number) {
	const cell = document.createElement('div')
	cell.setAttribute('data-x', i.toString())
	cell.setAttribute('data-y', j.toString())
	cell.classList.add('cell')
	cell.style.height = (size - 2).toString() + 'px'
	cell.style.width = (size - 2).toString() + 'px'
	const p = document.createElement('p')

	cell.appendChild(p)
	return cell
}

function createGrid() {
	const grid_elem = document.getElementById('grid')
	grid_elem.style.height = (cols * size).toString() + 'px'
	grid_elem.style.width = (rows * size).toString() + 'px'
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = createCell(i, j)

			grid[i][j] = new Cell(cell)
			grid_elem.appendChild(cell)
		}
	}
}

createGrid()

type position = {
	x: number
	y: number
}

type direction = { x: -1; y: 0 } | { x: 0; y: -1 } | { x: 1; y: 0 } | { x: 0; y: 1 }

class Snake {
	head: position = { x: 0, y: 0 }
	towards: direction = { x: 0, y: 1 }

	constructor() {
		this.draw_snake(0, 0)
		setInterval(() => this.update(), updateTime)
	}

	draw_snake(x: number, y: number) {
		const old_cell = grid[x][y]
		if (old_cell.marked) {
			old_cell.unmark()
		}
		const new_cell = grid[this.head.x][this.head.y]
		if (new_cell.food) {
			new_cell.eatFood()
			score++
			updateScore()
			placeFood()
		}
		new_cell.mark()
	}

	update() {
		const { x, y } = this.head
		this.head.x = (this.head.x + this.towards.x + rows) % rows
		this.head.y = (this.head.y + this.towards.y + cols) % cols
		// console.log(this.head)
		this.draw_snake(x, y)
	}
}

const snake = new Snake()

function placeFood() {
	const x = Math.floor(Math.random() * rows) % rows
	const y = Math.floor(Math.random() * cols) % cols

	grid[x][y].placeFood()
}

function handleKeyPress(e: KeyboardEvent) {
	if (e.ctrlKey === false) {
		e.preventDefault()
	}

	if (e.key === 'ArrowDown') {
		snake.towards = { x: 1, y: 0 }
	} else if (e.key === 'ArrowUp') {
		snake.towards = { x: -1, y: 0 }
	} else if (e.key === 'ArrowLeft') {
		snake.towards = { x: 0, y: -1 }
	} else if (e.key === 'ArrowRight') {
		snake.towards = { x: 0, y: 1 }
	}
}

placeFood()

export default app
