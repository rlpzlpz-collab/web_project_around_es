export class FormValidator {
    _config;
    _form;
    _inputs;
    _button;
    constructor(config, form) {
        const button = form.querySelector(config.submitButtonSelector);
        if (!button) {
            throw new Error("No se encontró el botón de envío del formulario");
        }
        this._config = config;
        this._form = form;
        this._button = button;
        this._inputs = Array.from(form.querySelectorAll(config.inputSelector));
    }
    // Públicos
    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }
    resetValidation() {
        this._inputs.forEach((input) => this._hideInputError(input));
        this._toggleButtonState();
    }
    // Privados
    _setEventListeners() {
        this._form.addEventListener("input", this._handleInput);
    }
    _handleInput = (evt) => {
        const input = evt.target;
        if (!(input instanceof HTMLInputElement))
            return;
        this._checkInputValidity(input);
        this._toggleButtonState();
    };
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        }
        else {
            this._showInputError(input);
        }
    }
    _getErrorElement(input) {
        return this._form.querySelector(`#${input.id}-error`);
    }
    _showInputError(input) {
        const error = this._getErrorElement(input);
        input.classList.add(this._config.inputErrorClass);
        if (error) {
            error.textContent = input.validationMessage;
            error.classList.add(this._config.errorVisibleClass);
        }
    }
    _hideInputError(input) {
        const error = this._getErrorElement(input);
        input.classList.remove(this._config.inputErrorClass);
        if (error) {
            error.classList.remove(this._config.errorVisibleClass);
            error.textContent = "";
        }
    }
    _hasInvalidInput() {
        return this._inputs.some((input) => !input.validity.valid);
    }
    _toggleButtonState() {
        const invalid = this._hasInvalidInput();
        this._button.disabled = invalid;
        this._button.classList.toggle(this._config.inactiveButtonClass, invalid);
    }
}
