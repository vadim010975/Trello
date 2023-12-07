import Form from "./Form";
import Card from "./Card";

export default class Column {
  constructor(element) {
    this.element = element;
    this.btnAddEl = this.element.querySelector(".btn-add");
    this.onClickAdd = this.onClickAdd.bind(this);
    this.btnAddEl.addEventListener("click", this.onClickAdd);
    this.form = new Form();
    this.hideForm = this.hideForm.bind(this);
    this.form.cancelHandler = this.hideForm;
    this.addCard = this.addCard.bind(this);
    this.form.addCardHandler = this.addCard;
    this.insertionZone = null;
    this.insertElement = null;
    this.newCardContainerEl = null;
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onClickAdd() {
    this.btnAddEl.classList.add("hidden");
    this.element.appendChild(this.form.element);
  }

  hideForm() {
    this.form.clear();
    this.element.querySelector(".form").remove();
    this.btnAddEl.classList.remove("hidden");
  }

  addCard(card) {
    const cardContainerEl = document.createElement("div");
    cardContainerEl.classList.add("card-container");
    cardContainerEl.appendChild(card.element);
    this.element.insertAdjacentElement("afterbegin", cardContainerEl);
  }

  removeEmptyContainer() {
    const elements = this.getArrayCardContainers();
    const elementWithoutChildren = elements.find(
      (el) => el.children.length === 0,
    );
    if (elementWithoutChildren) {
      elementWithoutChildren.remove();
    }
    if (this.newCardContainerEl) {
      this.newCardContainerEl.remove();
    }
  }

  onMouseMove(e, insElement) {
    if (!insElement && this.insertElement === insElement) {
      return;
    }
    if (!insElement && this.insertElement !== insElement) {
      this.insertElement = insElement;
      this.removeEmptyContainer();
      this.insertionZone = null;
      return;
    }
    if (insElement) {
      const containerEl = insElement.closest(".card-container");
      if (containerEl) {
        containerEl.replaceWith(insElement);
      }
      this.insertElement = insElement;
      const insertionZone = this.getInsertionZone(e);
      if (this.insertionZone === insertionZone) {
        return;
      }
      this.insertionZone = insertionZone;
      this.removeEmptyContainer();
      this.addContainer();
    }
  }

  getInsertionZone(e) {
    const mouseY = e.clientY;
    const cardEls = this.getArrayCardContainers();
    if (cardEls.length === 0) {
      return 0;
    }
    for (let i = 0; i <= cardEls.length; i += 1) {
      let upperLimit;
      let bottomLimit;

      if (i === 0) {
        upperLimit = this.element.getBoundingClientRect().top;
        const { top, bottom } = cardEls[i].getBoundingClientRect();
        bottomLimit = (top + bottom) / 2;
      } else if (i === cardEls.length) {
        const { top: previousTop, bottom: previousBottom } =
          cardEls[i - 1].getBoundingClientRect();
        upperLimit = (previousTop + previousBottom) / 2;
        bottomLimit = this.element.getBoundingClientRect().bottom;
      } else {
        const { top: previousTop, bottom: previousBottom } =
          cardEls[i - 1].getBoundingClientRect();
        upperLimit = (previousTop + previousBottom) / 2;
        const { top, bottom } = cardEls[i].getBoundingClientRect();
        bottomLimit = (top + bottom) / 2;
      }

      if (mouseY >= upperLimit && mouseY < bottomLimit) {
        return i;
      }
    }
  }

  addContainer() {
    this.newCardContainerEl = document.createElement("div");
    this.newCardContainerEl.classList.add("new-card-container");
    this.newCardContainerEl.style.height =
      this.insertElement.offsetHeight + "px";
    const cardContainerEls = this.getArrayCardContainers();
    if (cardContainerEls.length === 0 || this.insertionZone === 0) {
      this.element.insertAdjacentElement("afterbegin", this.newCardContainerEl);
      return;
    }
    try {
      cardContainerEls[this.insertionZone - 1].insertAdjacentElement(
        "afterend",
        this.newCardContainerEl,
      );
    } catch (e) {
      console.error(e);
      console.log("this.insertionZone - 1: ", this.insertionZone - 1);
      console.log(
        "cardContainerEls[this.insertionZone - 1]: ",
        cardContainerEls[this.insertionZone - 1],
      );
    }
  }

  onMouseUp(presenceСursor) {
    if (presenceСursor) {
      if (this.newCardContainerEl) {
        this.newCardContainerEl.appendChild(this.insertElement);
        this.insertElement.style.cssText = "";
        this.newCardContainerEl.classList.remove("new-card-container");
        this.newCardContainerEl.classList.add("card-container");
        this.newCardContainerEl.style.cssText = "";
      }
    }
    delete this.newCardContainerEl;
    delete this.insertionZone;
    delete this.insertElement;
  }

  getArrayCardContainers() {
    return [...this.element.querySelectorAll(".card-container")];
  }

  getCardTexts() {
    const arrayCardTexts = [];
    this.getArrayCardContainers().forEach((el) => {
      arrayCardTexts.push(el.querySelector(".card").textContent);
    });
    return arrayCardTexts;
  }

  setData(dataArray) {
    for (let i = dataArray.length - 1; i >= 0; i -= 1) {
      const card = new Card(dataArray[i]);
      this.addCard(card);
    }
  }
}
