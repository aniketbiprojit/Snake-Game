import App from './App.svelte'

const rows = 10
const cols = 10
const size = 40

const app = new App({
	target: document.body,
	props: {
		rows,
		cols,
	},
})

function createGrid() {
	const grid_elem = document.getElementById('grid')
	grid_elem.style.height = (cols * size).toString() + 'px'
	grid_elem.style.width = (rows * size).toString() + 'px'
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = createCell(i, j)

			grid_elem.appendChild(cell)
		}
	}
}

createGrid()

export default app
function createCell(i: number, j: number) {
	const cell = document.createElement('div')
	cell.setAttribute('data-x', i.toString())
	cell.setAttribute('data-y', j.toString())
	const p = document.createElement('p')
	p.innerHTML = (i * rows + j).toString()
	cell.appendChild(p)
	return cell
}
