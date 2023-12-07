import Column from "./Column";
import initDnD from "./initDnD";

const firstColumnEl = document.querySelector(".first-column");
const secondColumnEl = document.querySelector(".second-column");
const thirdColumnEl = document.querySelector(".third-column");

const firstColumn = new Column(firstColumnEl);
const secondColumn = new Column(secondColumnEl);
const thirdColumn = new Column(thirdColumnEl);

const parentEl = document.querySelector(".main-container");
initDnD(parentEl, [firstColumn, secondColumn, thirdColumn]);
