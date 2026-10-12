import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { getElement } from "./utils/dom.js";
const editButton = getElement(".profile__edit-button");
const addCardButton = getElement(".profile__add-button");
const nameInput = getElement(".popup__input_type_name");
const descriptionInput = getElement(".popup__input_type_description");
const editForm = getElement("#edit-profile-form");
const newCardForm = getElement("#new-card-form");
const editValidator = new FormValidator(defaultFormConfig, editForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editValidator.enableValidation();
newCardValidator.enableValidation();
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});
function handleImageClick(name, link) {
    imagePopup.open(name, link);
}
function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getCardElement();
}
const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => cardsSection.addItem(createCard(item)),
}, ".cards__list");
cardsSection.renderItems();
function handleProfileFormSubmit(values) {
    userInfo.setUserInfo({ name: values.name, job: values.description });
}
function handleCardFormSubmit(values) {
    cardsSection.addItem(createCard({ name: values["place-name"], link: values.link }));
}
const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();
function handleOpenEditModal() {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    descriptionInput.value = job;
    editValidator.resetValidation();
    editPopup.open();
}
function handleOpenNewCardModal() {
    newCardValidator.resetValidation();
    newCardPopup.open();
}
editButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenNewCardModal);
