import React, { useEffect, useState } from "react"
import ContentLoader from "react-content-loader"

function Card({imageUrl, title, price, onClickPlus, basketItems, loading=false}) {
    const[isClicked, setIsClicked] = useState(false)            //состояние кнопки добавления в корзину (плюсика)

    //обновление состояния кнопки плюса
    useEffect(() => {
      const isItemInBasket = basketItems ? basketItems.some(item => item.title === title) : false   //проверка наличия товара в корзине (true/false)
      setIsClicked(isItemInBasket)
    }, [basketItems, title, price])

    //нажатие на кнопку добавления товара в корзину
    const handleClickPlus = () => {
      onClickPlus({ imageUrl, title, price });
      setIsClicked(!isClicked);
    } 


    return(
        <div className="card">
          {/* если страница не прогрузилась, то показываем react sceleton */}
          {loading ? (<ContentLoader 
              speed={2}
              width={300}
              height={300}
              viewBox="0 0 300 300"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="35" y="0" rx="10" ry="10" width="225" height="225" /> 
              <rect x="57" y="240" rx="3" ry="3" width="180" height="20" /> 
              <rect x="20" y="275" rx="3" ry="3" width="140" height="20" /> 
              <rect x="260" y="275" rx="6" ry="6" width="25" height="25" />
            </ContentLoader>) :  (
              <>
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
              </> )
              
          }
        </div>
    )
}


export default Card;