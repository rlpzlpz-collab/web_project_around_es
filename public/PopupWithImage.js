import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    _imageElement;
    _captionElement;
    constructor(popupSelector) {
        super(popupSelector);
        const image = this._popup.querySelector(".popup__image");
        const caption = this._popup.querySelector(".popup__caption");
        if (!image || !caption) {
            throw new Error("Faltan .popup__image o .popup__caption en el popup");
        }
        this._imageElement = image;
        this._captionElement = caption;
    }
    open(name = "", link = "") {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }
}
