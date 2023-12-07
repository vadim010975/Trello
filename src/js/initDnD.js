export default function initDnD(parentEl, arrayColumns) {
  let actualElement;
  let parentBefore;
  let parentAfter;
  let differenceX;
  let differenceY;

  window.onunload = () => {
    const dataArray = [];
    arrayColumns.forEach((column) => {
      dataArray.push(column.getCardTexts());
    });
    const jsonDataArray = JSON.stringify(dataArray);
    localStorage.setItem("Trello", jsonDataArray);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const dataArray = JSON.parse(localStorage.getItem("Trello"));
    if (dataArray.length !== arrayColumns.length) {
      return;
    }
    for (let i = 0; i < dataArray.length; i += 1) {
      arrayColumns[i].setData(dataArray[i]);
    }
  });

  parentEl.addEventListener("mousedown", (e) => {
    if ([...e.target.classList].includes("card")) {
      e.preventDefault();
      actualElement = e.target;
      parentBefore = actualElement.closest(".column").cloneNode(true);
      parentAfter = actualElement.closest(".column");
      const { left, top } = actualElement.getBoundingClientRect();
      actualElement.classList.add("dragged");
      differenceX = e.clientX - left;
      differenceY = e.clientY - top;
      document.documentElement.addEventListener("mouseup", onMouseUp);
      document.documentElement.addEventListener("mousemove", onMouseMove);
    }
  });

  const onMouseMove = (e) => {
    e.preventDefault();
    actualElement.style.left = e.clientX - differenceX + "px";
    actualElement.style.top = e.clientY - differenceY + "px";
    arrayColumns.forEach((column) => {
      if (isCursorOnElem(e, column)) {
        column.onMouseMove(e, actualElement);
      } else {
        column.onMouseMove(e, null);
      }
    });
  };

  const isCursorOnElem = (ev, column) => {
    let mouseX = ev.clientX;
    let mouseY = ev.clientY;
    const { left, right, top, bottom } = column.element.getBoundingClientRect();
    const res =
      mouseX > left && mouseX < right && mouseY > top && mouseY < bottom;
    return res;
  };

  const getColumnWithCursor = (e) => {
    return arrayColumns.find((column) => isCursorOnElem(e, column));
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    if (!getColumnWithCursor(e)) {
      parentAfter.replaceWith(parentBefore);
      actualElement.remove();
    }
    arrayColumns.forEach((column) => {
      if (isCursorOnElem(e, column)) {
        column.onMouseUp(true);
      } else {
        column.onMouseUp(false);
      }
    });
    document.documentElement.removeEventListener("mouseup", onMouseUp);
    document.documentElement.removeEventListener("mousemove", onMouseMove);
    actualElement.classList.remove("dragged");
    actualElement = undefined;
  };
}
