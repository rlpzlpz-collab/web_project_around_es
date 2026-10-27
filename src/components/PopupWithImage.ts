import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement;
  private _captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    const image = this._popup.querySelector<HTMLImageElement>(".popup__image");
    const caption = this._popup.querySelector<HTMLElement>(".popup__caption");
    if (!image || !caption) {
      throw new Error("Faltan .popup__image o .popup__caption en el popup");
    }
    this._imageElement = image;
    this._captionElement = caption;
  }

  public override open(name: string = "", link: string = ""): void {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}
