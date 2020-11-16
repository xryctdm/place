import {Api} from './api';
import {AddPlaceForm} from './add-place-form';
import {CardPopup} from './card-popup';
import {Card} from './card';
import {validationMessage} from './data';
import {Popup} from './popup';
import {CardList} from './card-list';
import {ProfileForm} from './profile-form';
import "./style.css";


const api = new Api({
  baseUrl: NODE_ENV === "development" ? "http://nomoreparties.co/cohort6" : "https://nomoreparties.co/cohort6",
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

api.getUserInfo().then(profileData => {
  profileForm.setData(profileData);
  const cardList = new CardList(placeList, viewCardPopup, function (cardData, viewCardPopup) {
    if (profileData._id === cardData.owner._id) {
      return new Card(cardData, viewCardPopup, api, profileData).createWithOwner();
    }
    return new Card(cardData, viewCardPopup, api, profileData).create();
  });

  api.getInitialCards().then(result => {
    cardList.render(result);
  });

  const addPlaceForm = new AddPlaceForm(
    document.querySelector('.popup__form'),
    addCardPopup,
    cardList,
    validationMessage,
    function (name, link) {
      return api.addCard(name, link);  
    }
  );
});

const profileForm = new ProfileForm(
  document.querySelector('.edit-popup__form'), 
  editNewPopup, 
  validationMessage,
  function (name, job) {
  api.saveUserInfo(name, job);
});

