function toggleButtonState(form, button) {
  button.disabled = !form.checkValidity();
}

export function resetValidation(form) {
  toggleButtonState(form, form.querySelector(".popup__button"));
}

function handleFormInput(evt) {
  const form = evt.currentTarget;
  const submitButton = form.querySelector(".popup__button");

  evt.target.reportValidity();
  toggleButtonState(form, submitButton);
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
