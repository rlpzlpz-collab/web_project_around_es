import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import { getElement } from "./utils/dom.js";
import { Api } from "./Api.js";
const editButton = getElement(".profile__edit-button");
const addCardButton = getElement(".profile__add-button");
const nameInput = getElement(".popup__input_type_name");
const descriptionInput = getElement(".popup__input_type_description");
const editForm = getElement("#edit-profile-form");
const newCardForm = getElement("#new-card-form");
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
const profileAvatar = getElement(".profile__image");
let userId;
const editValidator = new FormValidator(defaultFormConfig, editForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editValidator.enableValidation();
newCardValidator.enableValidation();
const confirmPopup = new PopupWithConfirmation("#confirm-popup");
confirmPopup.setEventListeners();
const avatarButton = getElement(".profile__avatar-button");
const avatarForm = getElement("#avatar-form");
const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarValidator.enableValidation();
async function handleAvatarFormSubmit(values) {
    try {
        const data = await api.updateAvatar(values.avatar);
        profileAvatar.src = data.avatar;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();
avatarButton.addEventListener("click", () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});
function handleImageClick(name, link) {
    imagePopup.open(name, link);
}
function handleLikeClick(id, isLiked) {
    return isLiked ? api.unlikeCard(id) : api.likeCard(id);
}
function handleDeleteClick(id, element) {
    confirmPopup.setSubmitAction(async () => {
        try {
            await api.deleteCard(id);
            element.remove();
            confirmPopup.close();
        }
        catch (err) {
            console.error(err);
        }
    });
    confirmPopup.open();
}
function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick, handleLikeClick, handleDeleteClick, data.owner === userId);
    return card.getCardElement();
}
let cardsSection;
async function loadInitialData() {
    try {
        const [user, cards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        userInfo.setUserInfo({ name: user.name, job: user.about });
        profileAvatar.src = user.avatar;
        userId = user._id;
        cardsSection = new Section({
            items: cards,
            renderer: (item) => cardsSection.addItem(createCard(item)),
        }, ".cards__list");
        cardsSection.renderItems();
    }
    catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}
loadInitialData();
async function handleProfileFormSubmit(values) {
    try {
        const data = await api.updateUserInfo({
            name: values.name,
            about: values.description,
        });
        userInfo.setUserInfo({ name: data.name, job: data.about });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
async function handleCardFormSubmit(values) {
    try {
        const card = await api.addCard({
            name: values["place-name"],
            link: values.link,
        });
        cardsSection.addItem(createCard(card));
    }
    catch (err) {
        console.error(err);
        throw err;
    }
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
