import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <>
            <div className="card">
                <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="card__image" />
                    <div className="card__caption">
                        <h2 className="card__text">{props.card.name}</h2>
                        <div className="card__like-box">
                            <button type="button" className="card__button-heart"></button>
                            <span className="card__like-amount">{props.card.likes.length}</span>
                        </div>
                        <button type="button" className="card__button-delete"></button>
                    </div>
            </div>
        </>

    )
}

export default Card;