import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card); 

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return (
    <div className="page">
      <Header />;
      <Main
        onCardClick = {handleCardClick}          
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="card"
        title="Новое место"
        children={
          <>
            <input id="place" type="text" name="place" placeholder="Название"
              className="form__field form__field_input_place " required minLength="2" maxLength="30" />
            <span id="place-error" className=""></span>
            <input id="link" name="link" type="url" placeholder="Ссылка на картинку"
              className="form__field form__field_input_link " required />
            <span id="link-error" className="" ></span>
          </>
        } />
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="profile"
        title="Редактировать профиль"
        children={
          <>
            <input id="name" type="text" name="name" placeholder="Имя"
              className="form__field form__field_input_name" required minLength="2" maxLength="40" />
            <span id="name-error" className=""></span>
            <input id="job" type="text" name="job" placeholder="Профессиональная деятельность"
              className="form__field form__field_input_job" required minLength="2" maxLength="200" />
            <span id="job-error" className=""></span>
          </>
        } />
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="avatar"
        title="Обновить аватар"
        children={
          <>
            <input id="avatar" name="link" type="url" placeholder="Ссылка на аватар"
              className="form__field form__field_input_avatar " required />
            <span id="avatar-error" className=""></span>
          </>
        } />
      <PopupWithForm
        onClose={closeAllPopups}
        name="confirm"
        title="Вы уверены"
        children={<></>}
      />
      <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />
    </div>

  );
}
export default App;
