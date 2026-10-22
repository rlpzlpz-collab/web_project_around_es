import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    _form;
    _handleConfirm = () => { };
    constructor(popupSelector) {
        super(popupSelector);
        const form = this._popup.querySelector(".popup__form");
        if (!form) {
            throw new Error("No se encontró el formulario del popup de confirmación");
        }
        this._form = form;
    }
    setSubmitAction(action) {
        this._handleConfirm = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleConfirm();
        });
    }
}
