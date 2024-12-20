import React from "react";
import './PaymentModal.scss'
import { useNavigate } from "react-router-dom";


function PaymentModal({onClose, setIsModalOpen, setBasketItems}) {

    //const navigate = useNavigate()    

    //оплата и закрытие окна
    const hadlePayAndClose = () => {
        const nameInput = document.querySelector('.input-long').value
        const dateInput = document.querySelector('.input-short').value
        const cardNumberInput = document.querySelectorAll('.input-long')[1].value
        const cvvInput = document.querySelectorAll('.input-short')[1].value

        if (nameInput && dateInput && cardNumberInput && cvvInput) {
            alert('Заказ успешно оформлен!')
            setBasketItems([])
            setIsModalOpen(false)
        } else {
            alert('Заполните, пожалуйста, все поля')
        }

    }

    //валидация на ввод букв
    const handleInputWords = (e) => {
            const regex = /[^A-Za-zА-Яа-яЁё\s]/g
            const value = e.target.value
            if (regex.test(value)) {
                alert('Допустим только ввод букв')
                e.target.value = e.target.value.replace(regex, '')    //замена недопустимых символов на пустую строку
            }  
    }


    //валидация на ввод даты
    const handleInputDate = (e) => {
        let value = e.target.value
        const regex = /[^0-9\/]/g
        value = value.replace(regex, '') 

        //форматирование ввода
        if (value.length > 2 && value[2] !== '/') {
            value = value.slice(0, 2) + '/' + value.slice(2)
        }

        //проверка месяца (от 01 до 12)
        if (value.length >= 2) {
            const month = parseInt(value.slice(0,2), 10)
            if (month < 1 || month > 12) {
                alert('Месяц должен быть от 01 до 12')
                e.target.value = ''       //очищаем поле ввода
                return
            }
        }

        //проверка год (от 25 до 50)
        if (value.length >= 6) {
            const year = parseInt(value.slice(3,5), 10)
            if (year > 50 || year < 25) {
                alert('Год должен быть от 25 до 50')
                e.target.value = ''
                return
            }
        }
        e.target.value = value
    }


    //валидация на ввод номера карты
    const handleInputCardNumber = (e) => {
        let value = e.target.value
        const regex = /[^0-9]/g
        value = value.replace(regex, '')

        //форматирование ввода
        if (value.length > 4 && value[4] !== ' ') {
            value = value.slice(0, 4) + ' ' + value.slice(4)
        }
        if (value.length > 9 && value[9] !== ' ') {
            value = value.slice(0, 9) + ' ' + value.slice(9)
        }
        if (value.length > 14 && value[14] !== ' ') {
            value = value.slice(0, 14) + ' ' + value.slice(14)
        }

        //ограничение на 16 цифр
        if (value.length > 19) {
            value = value.slice(0, 19)
        }

        e.target.value = value
    }


    //валидация на ввод кода CVV
    const handleInputCVV = (e) => {
        let value = e.target.value
        const regex = /[^0-9]/g
        value = value.replace(regex, '')

        if (value.length > 3) {
            value = value.slice(0, 3)
        }

        e.target.value = value
    }


    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <img className="img_cart" src="/img/cart_icon.png" alt="icon of cart" />
                <img onClick={onClose} className="img_cancel" src="/img/cancel_active.svg"/>
                <h2>Заполните способ оплаты</h2>

                <form>
                    <div className="form_group">
                        <p className="form_label">Имя на карте</p>
                        <input className="input-long" type="text" placeholder="Фамилия Имя" onInput={handleInputWords}/>
                    </div>
                    <div className="form_group2">
                        <p className="form_label">Срок</p>
                        <input className="input-short" type="text" placeholder="MM/YY" onInput={handleInputDate}/>
                    </div>
                    <div className="form_group">
                        <p className="form_label">Номер карты</p>
                        <input className="input-long" type="text" placeholder="0000 0000 0000 0000" onInput={handleInputCardNumber}/>
                    </div>
                    <div className="form_group2">
                        <p className="form_label">CVV</p>
                        <input className="input-short" type="password" placeholder="***" onInput={handleInputCVV}/>
                    </div>
                </form>
                
                <div className="buttons">
                    <button className="btn-close" onClick={onClose}>Закрыть</button>
                    <button onClick={hadlePayAndClose} className="btn-pay">Оплатить</button>
                </div>


            </div>
       </div>

    )
}

export default PaymentModal;
