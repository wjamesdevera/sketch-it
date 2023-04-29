const DEFAULT_COLOR = '#000000';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let eraserOn = false;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}



const color = document.getElementById('color');
const clearBtn = document.getElementById('clearBtn');
const sizeSlider = document.getElementById('box-size');
const grid = document.getElementById('grid-container');
const sizeText = document.getElementById('size-value');
const gridBorder = document.getElementById('checkbox');
const eraser = document.getElementById('eraser');


clearBtn.onclick = () => reloadGrid();
color.oninput = (e) => setCurrentColor(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
gridBorder.onclick = () => addGridBorder();
eraser.onclick = () => setEraser();

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setEraser() {
    if (!eraserOn) {
        eraserOn = true;
        eraser.style.backgroundColor = '#000000';
        eraser.style.color = '#FFFFFF';
    } else {
        eraserOn = false;
        eraser.style.backgroundColor = '#FFFFFF';
        eraser.style.color = '#000000';
    }
}


function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}


function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function generateGrid(size) {
    for (let i = 0; i < size; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        grid.appendChild(gridRow);
        for (let j = 0; j < size;  j++) {
            const gridBox = document.createElement('div');
            gridBox.classList.add('grid-box');
            gridBox.addEventListener('mouseover', changeColor);
            gridBox.addEventListener('mousedown', changeColor);
            gridRow.appendChild(gridBox);
        }
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (!eraserOn) {
        e.target.style.backgroundColor = currentColor;
    } else {
        e.target.style.backgroundColor = '#FFFFFF';
    }
}

function updateSizeValue(e) {
    sizeText.innerHTML = `${currentSize} x ${currentSize}`;
}

function addGridBorder() {
    const gridBoxes = document.querySelectorAll('.grid-box');
    gridBoxes.forEach(gridBox => {
        gridBox.classList.toggle('grid-border');
    })
}

window.onload = () => {
    generateGrid(DEFAULT_SIZE);
}