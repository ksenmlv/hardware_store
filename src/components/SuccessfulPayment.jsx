import React from "react";

import '../styles_scss/succesfulPayment.scss'


function Successful_payment({setIsSuccessfulPaymentOpened}){

     const onClose = () => {
        setIsSuccessfulPaymentOpened(false)
     }

    return(
        <div className="overlay"> 
            <div className="rightSide">
                <h2>Корзина  <img onClick={onClose} src="/img/cancel_active.svg" alt="button of cancel" className="btn_close_basket"/></h2>
                
                <div className="successModal">
                    <img className="success_img" src="/img/successful_payment.svg" alt="success"/>
                    <h2>Заказ оформлен!</h2>
                    <p>Ваш заказ № скоро будет передан курьерской доставке</p>
                    
                    <button onClick={onClose}>
                        <img src="/img/arrow_left.svg" alt="arrow" />
                        Вернуться
                    </button>
                </div>
            </div>
        </div> 
    )
}


export default Successful_payment;