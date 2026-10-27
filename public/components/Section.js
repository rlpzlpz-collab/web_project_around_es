export class Section {
    _items;
    _renderer;
    _container;
    constructor({ items, renderer }, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor ${containerSelector}`);
        }
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }
    renderItems() {
        this._items.forEach((item) => this._renderer(item));
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
