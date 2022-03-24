import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
function App() {
  /*переменные состояния */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /*закрытие всех попапов*/
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  /*открытие попапов*/
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  /*получаю карточки с сервера*/
  useEffect(() => {
    api.getServerCards()
      .then((cardsArray) => {
        setCards(cardsArray);
      })
      .catch((err) => {
        console.log(`Невозможно отобразить карточки с сервера ${err}`);
      })
  }, [])

  /*получаю информацию о профиле с сервера*/
  useEffect(() => {
    api.getUserInfo()
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
      })
      .catch((err) => {
        console.log(`Невозможно получить информацию о пользователе ${err}`);
      });
  }, [])


  /*функция изменения данных в профиле*/
  function handleUpdateUser(data) {
    console.log(data);
    api.patchUserInfo(data)
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      })
  }
  /*функция изменения аватара*/
  function handleUpdateAvatar(data) {
    api.patchAvatar(data.avatar)
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      })
  }
  /*функция постановки/снятия лайка*/
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    isLiked
      ? api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      : api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
  }
  /*функция удаления карточки , если она своя*/
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Невозможно удалить карточку: ${err}`);
      })
  }
  /*функция добавления карточки*/
  function handleAddPlace(card) {
    api.postCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно добавить карточку: ${err}`);
      })
  }
  /* создаем все элементы страницы header,main,footer и все попапы*/
  return (
    /*обертываем весь контейнер в провайдер и передаем значение текущей переменной*/
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />;
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm"
          title="Вы уверены"
          buttonText="Да"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
