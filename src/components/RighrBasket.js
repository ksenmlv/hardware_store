import { useEffect, useState } from "react";
import PaymentModal from "../pages/PaymentModal";


function RightBasket({onClose, onRemove, items=[], setTotalPrice, setBasketItems, isAuthenticated}) {
    //модальное окно для оплаты заказа
    const [isModalOpen, setIsModalOpen] = useState(false)

    //вычисление итоговой суммы
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
    const tax = totalPrice * 0.1
    const totalWithTax = totalPrice + tax

    //обновление итоговой суммы
    useEffect(() => {
        setTotalPrice(totalWithTax)
    }, [items, setTotalPrice, totalWithTax])

    //функция для открытия модального окна
    const handleOrder = () => {
        if (isAuthenticated == true) {
            setIsModalOpen(true)
        } else {
            alert('Сначала войдите в аккаунт')
        }
    }

    //функция для закрытия модального окна
    const handleCLoseModal = () => {
        setIsModalOpen(false)
    }
    
    
    return (
        <div className="overlay">
          <div className="rightSide">
            <h2>Корзина  <img onClick={onClose} src="/img/cancel_active.svg" alt="button of cancel" className="btn_close_basket"/></h2>

            {/* пустая корзина */}
            {items.length===0 && <div className="emptyCart">
                <img className="cart" src="/img/empty_basket.svg" alt="empty basket"/>
                <h2>Тут пусто☹️</h2>
                <p>*добавьте хотя бы 1 товар</p>
                
                <button onClick={onClose}>
                    <img src="/img/arrow_left.svg" alt="arrow" />
                    Вернуться
                </button>
            </div>}

            {/* товары в корзине */}
            {items.map((item) => (
                <div key={item.id} className="items">
                    <div className="cardItem">
                        <img src={item.imageUrl} alt="bearbrick" className="img_item"/>
                        <div>
                            <p>{item.title}</p>
                            <b>{item.price}₽</b>
                        </div>
                        <img onClick={() => onRemove(item.id)} src="/img/cancel_active.svg" alt="button of cancel" className="btn_cancel" />
                    </div>
                </div>
            ))} 
            

            {/* итого и налог с кнопкой*/}
            {items.length!==0 && <ul className="order_summary">
                <li>
                    <span>Налог 10%:</span>
                    <div></div>
                    <b>{tax}₽</b>
                </li>
                <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalWithTax}₽</b>
                </li>
                <button onClick={handleOrder} className="btn_order">Сделать заказ<img src="/img/arrow_right.svg" alt="arrow" /></button>
            </ul>}            

          </div>

          {isModalOpen && <PaymentModal onClose={handleCLoseModal} setIsModalOpen={setIsModalOpen} setBasketItems={setBasketItems} />}

        </div>
    )
}



export default RightBasket;