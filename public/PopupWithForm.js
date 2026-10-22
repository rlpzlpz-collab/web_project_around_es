import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    _form;
    _inputs;
    _handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const form = this._popup.querySelector(".popup__form");
        if (!form) {
            throw new Error("No se encontró .popup__form en el popup");
        }
        this._form = form;
        this._inputs = Array.from(form.querySelectorAll(".popup__input"));
        this._handleFormSubmit = handleFormSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const submitButton = this._form.querySelector(".popup__button");
            const originalText = submitButton?.textContent ?? "";
            if (submitButton)
                submitButton.textContent = "Guardando...";
            Promise.resolve(this._handleFormSubmit(this._getInputValues()))
                .then(() => this.close())
                .catch((err) => console.log(err))
                .finally(() => {
                if (submitButton)
                    submitButton.textContent = originalText;
            });
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
    _getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
}
