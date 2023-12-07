import Card from "./Card";

export default class Form {
  constructor() {
    this.element = document.createElement("form");
    this.element.classList.add("form");
    this.element.innerHTML = `
    <textarea type="text" class="card-input" placeholder="Enter a  title for this card..." required></textarea>
    <div class="buttons">
      <button class="btn-add-card">Add Card</button>
      <button class="btn-cancel"></button>
    </div>`;
    this.inputEl = this.element.querySelector(".card-input");
    this.btnCancelEl = this.element.querySelector(".btn-cancel");
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.element.addEventListener("submit", this.onSubmit);
    this.btnCancelEl.addEventListener("click", this.onClickCancel);
    this.addCardHandler = null;
    this.cancelHandler = null;
  }

  onSubmit(e) {
    e.preventDefault();
    const card = new Card(this.inputEl.value);
    this.addCardHandler(card);
    this.cancelHandler();
  }

  onClickCancel(e) {
    e.preventDefault();
    this.cancelHandler();
  }

  clear() {
    this.element.reset();
  }
}
