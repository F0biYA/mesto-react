import React from "react";
function PopupWithForm({ title, name, isOpen, onClose, children, buttonText }) {
    
    return (
        <div className={isOpen ? `popup popup_opened popup_${name}` : `popup popup_${name}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__button-close popup__button-close_profile">
                </button>
                <form name={`${name}Form`} className={`form form_${name}`}>
                    <h3 className="form__title">{title}</h3>
                    {children}
                    <button type="submit" className="form__submit form__submit-profile">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
