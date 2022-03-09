import React from "react";
function PopupWithForm({ title, name, isOpen, onClose, children }) {
    return (
        <>
            <div  className={isOpen ? `popup popup_opened popup_${name}` : `popup popup_${name}`}>
                <div  className="popup__container">
                    <button onClick={onClose} type="button" className="popup__button-close popup__button-close_profile">
                    </button>
                    <form name={`${name}Form`} className={`form form_${name}`}>
                        <h3 className="form__title">{title}</h3>
                        {children}
                        <button type="submit" className="form__submit form__submit-profile">Сохранить</button>
                    </form>
                </div>
            </div>


        </>
    );
}
export default PopupWithForm;

/*<input id="name" type="text" name="name" placeholder="Имя"
                className="form__field form__field_input_name" required minlength="2" maxlength="40" />
            <span id="name-error" className=""></span>
            <input id="job" type="text" name="job" placeholder="Профессиональная деятельность"
                className="form__field form__field_input_job" required minlength="2" maxlength="200" />
            <span id="job-error" className=""></span>

            <div className="popup popup_avatar">
                <div className="popup__container">
                    <button type="button" className="popup__button-close popup__button-close_profile">
                    </button>
                    <form name="avatarForm" className="form form_avatar">
                        <h3 className="form__title">Обновить аватар</h3>
                        <input id="avatar" name="link" type="url" placeholder="Ссылка на аватар"
                            className="form__field form__field_input_avatar " required />
                        <span id="avatar-error" className=""></span>
                        <button type="submit" className="form__submit form__submit-avatar">Сохранить</button>
                    </form>
                </div>
            </div>
            <div className="popup popup_confirm">
                <div className="popup__container">
                    <button type="button" className="popup__button-close popup__button-close_confirm">
                    </button>
                    <form name="confirmForm" className="form form_confirm">
                        <h3 className="form__title">Вы уверены?</h3>
                        <button type="submit" className="form__submit form__submit-confirm">Да</button>
                    </form>
                </div>
            </div>
            <div className="popup popup_card">
                <div className="popup__container">
                    <button type="button" className="popup__button-close_card popup__button-close">
                    </button>
                    <form name="cardForm" className="form form_card">
                        <h3 className="form__title ">Новое место</h3>
                        <input id="place" type="text" name="place" placeholder="Название"
                            className="form__field form__field_input_place " required minlength="2" maxlength="30" />
                        <span id="place-error" className=""></span>
                        <input id="link" name="link" type="url" placeholder="Ссылка на картинку"
                            className="form__field form__field_input_link " required />
                        <span id="link-error" className="" ></span>
                        <button type="submit" className="form__submit  form__submit-card">Создать</button>
                    </form>
                </div>
            </div>  */