const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorVisibleClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorVisibleClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  buttonElement.disabled = hasInvalidInput(inputList);
}

export function resetValidation(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => hideInputError(form, inputElement));
  toggleButtonState(inputList, buttonElement);
}

function handleFormInput(evt) {
  const form = evt.currentTarget;
  const inputElement = evt.target;
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  checkInputValidity(form, inputElement);
  toggleButtonState(inputList, submitButton);
}

export function setEventListeners({
  editForm,
  newCardForm,
  onEditSubmit,
  onNewCardSubmit,
}) {
  resetValidation(editForm);
  resetValidation(newCardForm);

  editForm.addEventListener("input", handleFormInput);
  editForm.addEventListener("submit", onEditSubmit);

  newCardForm.addEventListener("input", handleFormInput);
  newCardForm.addEventListener("submit", onNewCardSubmit);
}
