import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card } from "./Card.js";
import type { CardData } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import type { InputValues } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { getElement } from "./utils/dom.js";

const editButton = getElement<HTMLButtonElement>(".profile__edit-button");
const addCardButton = getElement<HTMLButtonElement>(".profile__add-button");
const nameInput = getElement<HTMLInputElement>(".popup__input_type_name");
const descriptionInput = getElement<HTMLInputElement>(".popup__input_type_description");
const editForm = getElement<HTMLFormElement>("#edit-profile-form");
const newCardForm = getElement<HTMLFormElement>("#new-card-form");

const editValidator = new FormValidator(defaultFormConfig, editForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editValidator.enableValidation();
newCardValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleImageClick(name: string, link: string): void {
  imagePopup.open(name, link);
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getCardElement();
}

const cardsSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => cardsSection.addItem(createCard(item)),
  },
  ".cards__list",
);

cardsSection.renderItems();

function handleProfileFormSubmit(values: InputValues): void {
  userInfo.setUserInfo({ name: values.name, job: values.description });
}

function handleCardFormSubmit(values: InputValues): void {
  cardsSection.addItem(
    createCard({ name: values["place-name"], link: values.link }),
  );
}

const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();

function handleOpenEditModal(): void {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
  editValidator.resetValidation();
  editPopup.open();
}

function handleOpenNewCardModal(): void {
  newCardValidator.resetValidation();
  newCardPopup.open();
}

editButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenNewCardModal);