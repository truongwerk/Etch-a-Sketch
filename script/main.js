const divContainer = document.querySelector("#container");
let sketchSize = 16;
let boardRatio = 600 / sketchSize;
let penMode = 0;

/* Make sketch  with default */
resize(sketchSize);
function resize(sketchSize) {
	removeAllChildNodes(divContainer);
	for (let i = 1; i <= sketchSize; i++) {
		let divRow = document.createElement("div");
		divRow.id = "row" + i;
		divRow.className = "divRow";
		divContainer.appendChild(divRow);
		divRow.style.height = 600 / sketchSize + "px";
		for (let j = 1; j <= sketchSize; j++) {
			var divPixel = document.createElement("div");
			divPixel.id = "pixel" + ((i - 1) * sketchSize + j);
			divPixel.className = "pixelBoard";
			divRow.appendChild(divPixel);
			divPixel.style.width = 600 / sketchSize + "px";
		}
	}
	if (penMode == 1) {
		pickMode();
	} else if (penMode == 2) {
		eraserMode();
	} else if (penMode == 3) {
		randomMode();
	}
}

/* Resize the sketch */
const resizebtn = document.querySelector("#resize");
resizebtn.addEventListener("click", changeSize, false);
function changeSize(e) {
	let playerInput = prompt("Choose your size (1-64)");
	if (playerInput >= 1 && playerInput <= 64) {
		resize(playerInput);
	}
}
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*Clear the sketch */
const clearbtn = document.querySelector("#clear");
clearbtn.addEventListener("click", clearSketch, false);
function clearSketch() {
	const pixelBoardBox = document.querySelectorAll(".pixelBoard");
	pixelBoardBox.forEach(
		(pixelBoard) => (pixelBoard.style.background = "white")
	);
}

/*Pick Mode*/
const pickBtn = document.querySelector("#modePick");
pickBtn.addEventListener("click", pickMode, false);
function pickMode() {
	penMode = 1;
	randomBtn.classList.remove("choosingMode");
	eraserBtn.classList.remove("choosingMode");
	pickBtn.classList.add("choosingMode");
	const pixelBoardBox = document.querySelectorAll(".pixelBoard");
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawRandom, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawEraser, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.addEventListener("mouseenter", drawPick, false)
	);
}
function drawPick(e) {
	const pickValue = document.querySelector("#colorPick").value;
	this.style.background = `${pickValue}`;
}

/*Eraser mode */
const eraserBtn = document.querySelector("#modeEraser");
eraserBtn.addEventListener("click", eraserMode, false);
function eraserMode() {
	penMode = 2;
	pickBtn.classList.remove("choosingMode");
	randomBtn.classList.remove("choosingMode");
	eraserBtn.classList.add("choosingMode");
	const pixelBoardBox = document.querySelectorAll(".pixelBoard");
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawPick, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawRandom, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.addEventListener("mouseenter", drawEraser, false)
	);
}
function drawEraser(e) {
	this.style.background = "white";
}

/* randomMode */
const randomBtn = document.querySelector("#modeRandom");
randomBtn.addEventListener("click", randomMode, false);
function randomMode() {
	penMode = 3;
	eraserBtn.classList.remove("choosingMode");
	pickBtn.classList.remove("choosingMode");
	randomBtn.classList.add("choosingMode");
	const pixelBoardBox = document.querySelectorAll(".pixelBoard");
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawPick, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.removeEventListener("mouseenter", drawEraser, false)
	);
	pixelBoardBox.forEach((pixelBoard) =>
		pixelBoard.addEventListener("mouseenter", drawRandom, false)
	);
}
function randomValue() {
	let randomHueValue = Math.ceil(Math.random() * 255);
	return randomHueValue;
}
function drawRandom(e) {
	this.style.background = `rgb(${randomValue()},${randomValue()},${randomValue()})`;
}


