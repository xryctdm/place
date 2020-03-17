
const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort6',
  headers: {
    authorization: '96a71016-5850-4711-a632-4339a8c4303d',
    'Content-Type': 'application/json'
  }
});


const placeList = document.querySelector('.places-list');



const viewCardPopup = new CardPopup(
  document.querySelector('.photo-popup'),
  document.querySelectorAll('.place-card__image')
);

const editNewPopup = new Popup(
  document.querySelector('.edit-popup'),
  document.querySelectorAll('.user-info__edit-button')
);

const addCardPopup = new Popup(
  document.querySelector('.popup'),
  document.querySelectorAll('.user-info__button')
);


const cardList = new CardList(placeList, viewCardPopup, function (cardData, viewCardPopup) {
  return new Card(cardData, viewCardPopup).create();
});


api.getInitialCards().then(result => {
  cardList.render(result);
});


const addPlaceForm = new AddPlaceForm(
  document.querySelector('.popup__form'),
  addCardPopup,
  cardList,
  validationMessage
);

const profileForm = new ProfileForm(document.querySelector('.edit-popup__form'), editNewPopup, function (name, job) {
  api.saveUserInfo(name, job);
});

api.getUserInfo().then(result => {
  profileForm.setData(result);
});