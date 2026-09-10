const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

const cardTemplate = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImageElement = imagePopup.querySelector(".popup__image");
const imagePopupCaptionElement = imagePopup.querySelector(".popup__caption");

const formElement = document.querySelector("#edit-profile-form");

const editSubmitButton = editPopup.querySelector(".popup__button");

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
} = {}) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardTitleElement.textContent = name;

  cardLikeButton.addEventListener("click", handleLikeClick);
  cardDeleteButton.addEventListener("click", handleDeleteClick);
  cardImageElement.addEventListener("click", handleImageClick);

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsListElement);

  closeModal(newCardPopup);
  newCardForm.reset();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteClick(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

function handleImageClick(evt) {
  imagePopupImageElement.src = evt.target.src;
  imagePopupImageElement.alt = evt.target.alt;
  imagePopupCaptionElement.textContent = evt.target.alt;

  openModal(imagePopup);
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  toggleButtonState(formElement, editSubmitButton);
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

function toggleButtonState(form, button) {
  button.disabled = !form.checkValidity();
}

function handleEditFormInput(evt) {
  evt.target.reportValidity();
  toggleButtonState(formElement, editSubmitButton);
}

formElement.addEventListener("input", handleEditFormInput);

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsListElement);
});

editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", () => closeModal(editPopup));
formElement.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => openModal(newCardPopup));
newCardCloseButton.addEventListener("click", () => closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));
