export interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ items, renderer }: SectionConfig<T>, containerSelector: string) {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) {
      throw new Error(`No se encontró el contenedor ${containerSelector}`);
    }
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  public renderItems(): void {
    this._items.forEach((item) => this._renderer(item));
  }

  public addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}