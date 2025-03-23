const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Profile Elements
const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Form Elements
const editModal = document.querySelector("#edit-modal");
const editForm = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardForm = cardModal.querySelector(".modal__form");
const cardName = cardModal.querySelector("#add-card-name-input");
const cardLink = cardModal.querySelector("#add-card-link-input");

//Select the modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");

// Card Related Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", (evt) => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = { name: cardName.value, link: cardLink.value };
  const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement);
  closeModal(cardModal);
  evt.target.reset(); // Reset the form fields after submission
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

//Functions for editing profile name and description
editModalBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

//Functions for adding cards
cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((item) => {
  console.log(item);
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
