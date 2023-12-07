export default class Card {
  constructor(text) {
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.textContent = text;
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
    this.btnRemoveEl = document.createElement("div");
    this.btnRemoveEl.classList.add("card-remover", "hidden");
    this.element.appendChild(this.btnRemoveEl);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.btnRemoveEl.addEventListener("click", this.onClickRemove);
  }

  onClickRemove() {
    this.element.closest(".card-container").remove();
  }

  onMouseEnter() {
    this.btnRemoveEl.classList.remove("hidden");
  }

  onMouseLeave() {
    this.btnRemoveEl.classList.add("hidden");
  }
}
