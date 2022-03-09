import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';
import Card from './Card';

function Main({ onCardClick, onEditProfile, onAddPlace, onEditAvatar }) {

    const [userName, setUserName] = useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = useState('#');
    const [cards, setCards] = useState([]);

    /*получение данных профиля с сервера*/
    useEffect(() => {
        api.getUserInfo()
            .then((userInfoObject) => {
                setUserName(userInfoObject.name);
                setUserDescription(userInfoObject.about);
                setUserAvatar(userInfoObject.avatar);
            })
            .catch((err) => {
                console.log(`Невозможно получить информацию о пользователе ${err}`);
            }, []);
    })
    /*получение карточек с сервера*/
    useEffect(() => {
        api.getServerCards()
            .then((cardsArray) => {
                setCards(cardsArray);
            })
            .catch((err) => {
                console.log(`Невозможно отобразить карточки с сервера ${err}`);
            })
    }, [])

    /*создание карточек из полученного массива
    const elements = cards.map((card) => {
        return <Card
            onCardClick={onCardClick}
            card={card}
            key={card._id}
        />
    })*/
    
    /*возвращаем секцию профиля и секцию карточек*/
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__block">
                    <div className="profile__image-block">
                        <img onClick={onEditAvatar} className="profile__image" src={userAvatar} alt="Фото Профиля" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__button-edit">
                        </button>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                    <button onClick={onAddPlace} type="button" className="profile__button-add">
                    </button>
                </div>
            </section>
            <section className="cards">{
                cards.map((card) => {
                    return (<Card
                        onCardClick={onCardClick}
                        card={card}
                        key={card._id}
                    />)
                })
            }
            </section>
        </main>
    )
}
export default Main;