const grid = document.querySelector('.grid')
const selector = document.querySelector('#sizeSelector')
const sizeValue = document.querySelector('#sizeValue')
const btnReset = document.querySelector('#btnReset')
const btnErase = document.querySelector('#btnErase')
const btnColor = document.querySelector('#btnColor')
const btnBorders = document.querySelector('#btnBorders')
const picker = document.querySelector('#picker')
const btnRgb = document.querySelector('#btnRgb')
const pickerBg = document.querySelector('#pickerBg')
const btnGrab = document.querySelector('#grab')

let currentSize = 16
let currentMode = 'color'
let toggleBorder = false;
let currentColor = '#000000';
let currentBg = '#ffffff'

createGrid(currentSize);
checkBtn();

// grab button
btnGrab.addEventListener('click', () => {
    currentMode = 'grab';
    checkBtn();
    
})

// color button
btnColor.addEventListener('click', () => {
    currentMode = 'color';
    checkBtn();   
})

// RGB button
btnRgb.addEventListener('click', () => {
    currentMode = 'rgb';
    checkBtn();
})

// eraser button
btnErase.addEventListener('click', () => {
    currentMode = 'erase';
    checkBtn();
})

// borders button
btnBorders.addEventListener('click', () => {
    cell = document.querySelectorAll('.grid > div');
    if (!toggleBorder) {
        for (let i = 0; i < cell.length; i++)
        cell[i].style.border = '1px grey solid';
        toggleBorder = true;
        btnBorders.classList.add('active');
    } else {
        for (let i = 0; i < cell.length; i++)
        cell[i].style.border = 'none';
        toggleBorder = false;
        btnBorders.classList.remove('active');
    }

})

// color selector
picker.addEventListener('input', (event) => {
    currentColor = event.target.value;
    
})

// background selector
pickerBg.addEventListener('input', (event) => {
    currentBg = event.target.value;
    grid.style.backgroundColor = currentBg;
})

// size selector
selector.addEventListener('input', (event) => {
    currentSize = event.target.value;
    clearGrid();
    createGrid(currentSize);
    sizeValue.textContent = `Grid size: ${event.target.value} x ${event.target.value}`;
})

// clear button
btnReset.addEventListener('click', () => {
    clearGrid();
    createGrid(currentSize)})


// functions 

function checkBtn() {
    if (currentMode == 'rgb') btnRgb.classList.add('active');
    else btnRgb.classList.remove('active');

    if (currentMode == 'color') btnColor.classList.add('active');
    else btnColor.classList.remove('active');

    if (currentMode == 'erase') btnErase.classList.add('active');
    else btnErase.classList.remove('active');

    if (currentMode == 'grab') btnGrab.classList.add('active');
    else btnGrab.classList.remove('active');
}


function clearGrid() {
        grid.innerHTML='';
}


function createGrid(s) {
    grid.style.gridTemplateColumns = `repeat(${s}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${s}, 1fr)`
    for (let i = 0; i < s * s ; i++) {
    const cell = document.createElement('div');
    if (toggleBorder) cell.style.border = '1px grey solid';
    cell.addEventListener('mouseover', changeColor);
    cell.addEventListener('mousedown', changeColor);
    grid.appendChild(cell); 
    }
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    // we need to check both mouseover and mousedown, but those are mutualy exclusive, so we implement a var
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode == 'rgb') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`; 
    } else if (currentMode == 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode == 'erase') {
        e.target.style.backgroundColor = ""; 
    } else if (currentMode == 'grab') {
        if (e.target.style.backgroundColor != "") {
        picker.value = rgbToHex(e.target.style.backgroundColor);
        currentColor = e.target.style.backgroundColor;
        currentMode = 'color';
        checkBtn(); 
        }
    }
}

function rgbToHex(rgb) {
    let char = rgb.indexOf(',') > -1 ? ',' : ' ';
    rgb = rgb.substr(4).split(')')[0].split(char);
    let r = (+rgb[0]),
      g = (+rgb[1]),
      b = (+rgb[2]);
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
   
}