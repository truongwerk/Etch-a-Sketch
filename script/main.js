const divContainer = document.querySelector("#container");
divContainer.addEventListener("click", function () {
	togglePen();
});
let sketchSize = 16;
let boardRatio = 600 / sketchSize;
let penMode = "";
let cells = [];
let currentlyActive = false;
let currentColor = [];

/* Make sketch  with default */
makeSketch(sketchSize);
function makeSketch(sketchSize) {
	removeAllChildNodes(divContainer);
	for (let i = 1; i <= sketchSize; i++) {
		let divRow = document.createElement("div");
		divRow.id = "row" + i;
		divRow.className = "divRow";
		divContainer.appendChild(divRow);
		divRow.style.height = 600 / sketchSize + "px";
		for (let j = 1; j <= sketchSize; j++) {
			let divPixelId = (i - 1) * sketchSize + j - 1;
			cells[divPixelId] = document.createElement("div");
			cells[divPixelId].id = "pixel" + ((i - 1) * sketchSize + j);
			cells[divPixelId].className = "pixelBoard";
			cells[divPixelId].style.width = 600 / sketchSize + "px";
			divRow.appendChild(cells[divPixelId]);
			cells[divPixelId].addEventListener("click", activatePen);
		}
	}
}

/* Resize the sketch */
const resizebtn = document.querySelector("#resize");
resizebtn.addEventListener("click", changeSize, false);
function changeSize(e) {
	let playerInput = prompt("Choose your size (1-64)");
	if (playerInput >= 1 && playerInput <= 64) {
		makeSketch(playerInput);
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

/*Toggle pen, active pen */
function togglePen() {
	if (!currentlyActive) {
		cells.forEach((item) => {
			item.addEventListener("mouseleave", activatePen);
		});
		currentlyActive = true;
	} else {
		cells.forEach((item) => {
			item.removeEventListener("mouseleave", activatePen);
		});
		currentlyActive = false;
	}
}
function activatePen(e) {
	switch (String(penMode)) {
		case "randomMode":
			currentColor = randomColor();
			this.style.background = `rgba(${currentColor})`;
			break;
		case "eraserMode":
			currentColor = "white";
			this.style.background = `${currentColor}`;
			break;
		case "pickMode":
			currentColor = pickColor();
			this.style.background = `${currentColor}`;
			console.log(currentColor);
			break;
		default:
			this.style.background = "rgb(19, 123, 214, 0.95)";
	}
}

/*Pick Mode*/
const pickBtn = document.querySelector("#modePick");
pickBtn.addEventListener("click", pickMode, false);
function pickMode() {
	penMode = "pickMode";
	randomBtn.classList.remove("choosingMode");
	eraserBtn.classList.remove("choosingMode");
	pickBtn.classList.add("choosingMode");
}
function pickColor(e) {
	const pickValue = document.querySelector("#colorPick").value;
	return pickValue;
}

/*Eraser mode */
const eraserBtn = document.querySelector("#modeEraser");
eraserBtn.addEventListener("click", eraserMode, false);
function eraserMode() {
	penMode = "eraserMode";
	pickBtn.classList.remove("choosingMode");
	randomBtn.classList.remove("choosingMode");
	eraserBtn.classList.add("choosingMode");
}

/* random Mode */
const randomBtn = document.querySelector("#modeRandom");
randomBtn.addEventListener("click", randomMode, false);
function randomMode() {
	penMode = "randomMode";
	eraserBtn.classList.remove("choosingMode");
	pickBtn.classList.remove("choosingMode");
	randomBtn.classList.add("choosingMode");
}
function randomValue() {
	let randomValue = Math.ceil(Math.random() * 255);
	return randomValue;
}
function randomColor() {
	let randomColor = `${randomValue()},${randomValue()},${randomValue()}`;
	return randomColor;
}
