import App from './App.svelte'
import { Cell } from './Cell'

const rows = 50
const cols = 50
const size = 15

const app = new App({
	target: document.body,
	props: {
		rows,
		cols,
	},
})

const grid: Array<Array<Cell>> = Array.from(Array(rows), () => Array(cols))

function createCell(i: number, j: number) {
	const cell = document.createElement('div')
	cell.setAttribute('data-x', i.toString())
	cell.setAttribute('data-y', j.toString())
	cell.classList.add('cell')
	cell.style.height = (size - 2).toString() + 'px'
	cell.style.width = (size - 2).toString() + 'px'
	const p = document.createElement('p')
	// p.innerHTML = (i * rows + j).toString()
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
	}

	draw_snake(x: number, y: number) {
		const old_cell = grid[x][y]
		if (old_cell.marked) {
			old_cell.unmark
		}
		const cell = grid[this.head.x][this.head.y].mark()
	}
}

new Snake()

export default app
