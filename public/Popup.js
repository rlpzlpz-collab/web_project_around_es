export class Popup {
    _popup;
    constructor(popupSelector) {
        const popup = document.querySelector(popupSelector);
        if (!popup) {
            throw new Error(`No se encontró el popup ${popupSelector}`);
        }
        this._popup = popup;
    }
    open() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => this.close());
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
}
