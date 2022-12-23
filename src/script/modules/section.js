export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems({ items, renderer }) {
    this._items = items;
    this._renderer = renderer;
    this._items.forEach((item) => {
      this._renderer(item)
    })
  }
}
