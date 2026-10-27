import type { FormConfig } from "../utils/constants.js";

export class FormValidator {
  private _config: FormConfig;
  private _form: HTMLFormElement;
  private _inputs: HTMLInputElement[];
  private _button: HTMLButtonElement;

  constructor(config: FormConfig, form: HTMLFormElement) {
    const button = form.querySelector<HTMLButtonElement>(
      config.submitButtonSelector,
    );
    if (!button) {
      throw new Error("No se encontró el botón de envío del formulario");
    }
    this._config = config;
    this._form = form;
    this._button = button;
    this._inputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(config.inputSelector),
    );
  }

  // Públicos
  public enableValidation(): void {
    this._setEventListeners();
    this._toggleButtonState();
  }

  public resetValidation(): void {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }

  // Privados
  private _setEventListeners(): void {
    this._form.addEventListener("input", this._handleInput);
  }

  private _handleInput = (evt: Event): void => {
    const input = evt.target;
    if (!(input instanceof HTMLInputElement)) return;
    this._checkInputValidity(input);
    this._toggleButtonState();
  };

  private _checkInputValidity(input: HTMLInputElement): void {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  private _getErrorElement(input: HTMLInputElement): HTMLElement | null {
    return this._form.querySelector<HTMLElement>(`#${input.id}-error`);
  }

  private _showInputError(input: HTMLInputElement): void {
    const error = this._getErrorElement(input);
    input.classList.add(this._config.inputErrorClass);
    if (error) {
      error.textContent = input.validationMessage;
      error.classList.add(this._config.errorVisibleClass);
    }
  }

  private _hideInputError(input: HTMLInputElement): void {
    const error = this._getErrorElement(input);
    input.classList.remove(this._config.inputErrorClass);
    if (error) {
      error.classList.remove(this._config.errorVisibleClass);
      error.textContent = "";
    }
  }

  private _hasInvalidInput(): boolean {
    return this._inputs.some((input) => !input.validity.valid);
  }

  private _toggleButtonState(): void {
    const invalid = this._hasInvalidInput();
    this._button.disabled = invalid;
    this._button.classList.toggle(this._config.inactiveButtonClass, invalid);
  }
}
