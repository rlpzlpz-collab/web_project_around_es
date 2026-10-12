import { Popup } from "./Popup.js";

export type InputValues = Record<string, string>;
export type FormSubmitHandler = (values: InputValues) => void;

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _inputs: HTMLInputElement[];
  private _handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    const form = this._popup.querySelector<HTMLFormElement>(".popup__form");
    if (!form) {
      throw new Error("No se encontró .popup__form en el popup");
    }
    this._form = form;
    this._inputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(".popup__input")
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  public override setEventListeners(): void {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  public override close(): void {
    super.close();
    this._form.reset();
  }

  private _getInputValues(): InputValues {
    const values: InputValues = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
}