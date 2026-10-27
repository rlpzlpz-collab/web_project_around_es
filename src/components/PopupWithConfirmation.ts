import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private _form: HTMLFormElement;
  private _handleConfirm: () => void = () => {};

  constructor(popupSelector: string) {
    super(popupSelector);
    const form = this._popup.querySelector<HTMLFormElement>(".popup__form");
    if (!form) {
      throw new Error("No se encontró el formulario del popup de confirmación");
    }
    this._form = form;
  }

  public setSubmitAction(action: () => void): void {
    this._handleConfirm = action;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }
}
