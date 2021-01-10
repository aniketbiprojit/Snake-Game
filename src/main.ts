import App from './App.svelte'
import { Cell } from './Cell'

const rows = 10
const cols = 10
const size = 40
const updateTime = 150

let score = 0

let highestScore = 0

let fired = false

const app = new App({
	target: document.body,
	props: {
		// rows,
		// cols,
		handleKeyPress,
		score,
		clickHandler,
	},
})

const high_var = 'high'
if (localStorage.getItem(high_var)) {
	highestScore = parseInt(localStorage.getItem(high_var))
	updateHighest()
}

function updateScore() {
	document.getElementById('score').innerHTML = score.toString()
}

function updateHighest() {
	document.getElementById('highest_score').innerHTML = highestScore.toString()
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
	// p.innerHTML = `${i},${j}`
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
	interval: number
	tail: Array<position> = []
	add_tail = false
	constructor() {
		this.draw_snake(0, 0)
		this.interval = setInterval(() => this.update(), updateTime)
	}

	// addTail({ x = null, y = null }: { x?: number; y?: number } = {}) {
	// 	if (x !== null && y != null) {
	// 		this.tail.push({ x, y })
	// 	} else {
	// 		this.add_tail = true
	// 	}
	// }

	draw_snake(x: number, y: number) {
		const old_cell = grid[x][y]

		if (old_cell.marked) {
			old_cell.unmark()
		}
		const new_cell = grid[this.head.x][this.head.y]
		if (new_cell.marked) {
			alert('GameOver')
			if (score > highestScore) localStorage.setItem(high_var, score.toString())
			highestScore = score
			updateHighest()
			clearInterval(this.interval)
		}
		if (new_cell.food) {
			this.add_tail = true
			new_cell.eatFood()
			score += 100
			updateScore()
			placeFood()
		}
		new_cell.mark()
		const new_tail = Object.assign([], this.tail)

		for (let index = 0; index < this.tail.length; index++) {
			if (index === 0) new_tail[0] = { x, y }
			else new_tail[index] = this.tail[index - 1]
			grid[this.tail[index].x][this.tail[index].y].unmark()
		}
		if (this.add_tail === true) {
			if (this.tail.length === 0) new_tail.push({ x, y })
			else {
				new_tail.push(this.tail[this.tail.length - 1])
			}
			this.add_tail = false
		}
		this.tail = new_tail

		for (let index = 0; index < this.tail.length; index++) {
			grid[this.tail[index].x][this.tail[index].y].mark()
		}
		if (fired === true) {
			fired = false
		}
	}

	update() {
		const { x, y } = this.head
		this.head.x = (this.head.x + this.towards.x + rows) % rows
		this.head.y = (this.head.y + this.towards.y + cols) % cols

		this.draw_snake(x, y)
		if (this.tail.length > 0) score--
		updateScore()
	}
}

const snake = new Snake()

let count = 0

function placeFood() {
	count++
	if (count > rows * cols * 5) {
		alert('Exception left.')
		clearInterval(snake.interval)
	}
	const x = Math.floor(Math.random() * rows) % rows
	const y = Math.floor(Math.random() * cols) % cols

	const foodCell = grid[x][y]
	if (foodCell.marked) {
		return placeFood()
	}
	foodCell.placeFood()
	count = 0
}

async function clickHandler(val: 'up' | 'down' | 'left' | 'right') {
	switch (val) {
		case 'down':
			if (snake.towards.x !== -1 || snake.tail.length === 0) snake.towards = { x: 1, y: 0 }
			break
		case 'up':
			if (snake.towards.x !== 1 || snake.tail.length === 0) snake.towards = { x: -1, y: 0 }
			break
		case 'left':
			if (snake.towards.y !== 1 || snake.tail.length === 0) snake.towards = { x: 0, y: -1 }
			break
		case 'right':
			if (snake.towards.y !== -1 || snake.tail.length === 0) snake.towards = { x: 0, y: 1 }
			break
		default:
			break
	}
}

async function handleKeyPress(e: KeyboardEvent) {
	if (e.ctrlKey === false) {
		e.preventDefault()
	}
	if (fired === true) {
		await new Promise((resolve) => {
			setTimeout(resolve, 150)
		})
	}
	fired = true

	if (e.key === 'ArrowDown') {
		if (snake.towards.x !== -1 || snake.tail.length === 0) snake.towards = { x: 1, y: 0 }
	} else if (e.key === 'ArrowUp') {
		if (snake.towards.x !== 1 || snake.tail.length === 0) snake.towards = { x: -1, y: 0 }
	} else if (e.key === 'ArrowLeft') {
		if (snake.towards.y !== 1 || snake.tail.length === 0) snake.towards = { x: 0, y: -1 }
	} else if (e.key === 'ArrowRight') {
		if (snake.towards.y !== -1 || snake.tail.length === 0) snake.towards = { x: 0, y: 1 }
	}
}

placeFood()

export default app
