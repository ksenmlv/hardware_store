import React, { useEffect, useState } from "react";

function Card({imageUrl, title, price, onClickPlus, basketItems}) {
    const[isClicked, setIsClicked] = useState(false)            //состояние кнопки добавления в корзину (плюсика)

    //обновление состояния кнопки плюса
    useEffect(() => {
      const isItemInBasket = basketItems.some(item => item.title === title)    //проверка наличия товара в корзине (true/false)
      setIsClicked(isItemInBasket)
    }, [basketItems, title, price])

    //нажатие на кнопку добавления товара в корзину
    const handleClickPlus = () => {
      onClickPlus({ imageUrl, title, price });
      setIsClicked(!isClicked);
    } 


    return(
        <div className="card">
          <img className="item" src={imageUrl} alt="дрон" width={270} height={200}/>
          <p>{title}</p>
          <div className="cardBottom">
            <div className="cardBottom2">
              <span>Цена:</span>
              <b> {price}₽</b>
            </div>
              {/* иконка плюса для добавления товара в корзину */}
              <img className="plus" onClick={handleClickPlus} src={isClicked ? "/img/plus_active.svg" : "/img/plus_passive.svg"} alt="plus" />
          </div>
        </div>
    )
}


export default Card;