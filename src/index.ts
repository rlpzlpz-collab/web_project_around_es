import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./Card.js";
import type { CardData } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import type { InputValues } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { getElement } from "./utils/dom.js";
import { Api } from "./Api.js";

const editButton = getElement<HTMLButtonElement>(".profile__edit-button");
const addCardButton = getElement<HTMLButtonElement>(".profile__add-button");
const nameInput = getElement<HTMLInputElement>(".popup__input_type_name");
const descriptionInput = getElement<HTMLInputElement>(
  ".popup__input_type_description",
);
const editForm = getElement<HTMLFormElement>("#edit-profile-form");
const newCardForm = getElement<HTMLFormElement>("#new-card-form");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "62385e17-dbe0-42b2-afe5-2f2bf83e8a28",
    "Content-Type": "application/json",
  },
});
const profileAvatar = getElement<HTMLImageElement>(".profile__image");
let userId: string;

const editValidator = new FormValidator(defaultFormConfig, editForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editValidator.enableValidation();
newCardValidator.enableValidation();

const confirmPopup = new PopupWithConfirmation("#confirm-popup");
confirmPopup.setEventListeners();

const avatarButton = getElement<HTMLButtonElement>(".profile__avatar-button");
const avatarForm = getElement<HTMLFormElement>("#avatar-form");

const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarValidator.enableValidation();

function handleAvatarFormSubmit(values: InputValues): Promise<void> {
  return api
    .updateAvatar(values.avatar)
    .then((data) => {
      profileAvatar.src = data.avatar;
    });
}

const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

function handleImageClick(name: string, link: string): void {
  imagePopup.open(name, link);
}

function handleLikeClick(id: string, isLiked: boolean): Promise<CardData> {
  return isLiked ? api.unlikeCard(id) : api.likeCard(id);
}

function handleDeleteClick(id: string, element: HTMLElement): void {
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCard(id)
      .then(() => {
        element.remove();
        confirmPopup.close();
      })
      .catch((err) => console.log(err));
  });
  confirmPopup.open();
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    data.owner === userId,
  );
  return card.getCardElement();
}

let cardsSection: Section<CardData>;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, job: user.about });
    profileAvatar.src = user.avatar;
    userId = user._id;

    cardsSection = new Section<CardData>(
      {
        items: cards,
        renderer: (item) => cardsSection.addItem(createCard(item)),
      },
      ".cards__list",
    );
    cardsSection.renderItems();
  })
  .catch((err) => console.log(err));

function handleProfileFormSubmit(values: InputValues): Promise<void> {
  return api
    .updateUserInfo({ name: values.name, about: values.description })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, job: data.about });
    });
}

function handleCardFormSubmit(values: InputValues): Promise<void> {
  return api
    .addCard({ name: values["place-name"], link: values.link })
    .then((card) => {
      cardsSection.addItem(createCard(card));
    });
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
