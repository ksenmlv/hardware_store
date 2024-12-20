import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './authorizedUser.scss'


function Authorized_user({userData, setIsAuthenticated}) {

    const navigate = useNavigate()

    //функция для закрытия всего окна
    const handleClickClose = () => {
        navigate('/')
    }

    const exitFromProfile = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('userData')
        localStorage.removeItem('isAuthenticated')
        alert('Вы вышли из аккаунта👾')
        navigate('/user_enter')
    }



return(
    <div className="overlay">
        <div className="rightSide2">

            <h2> Профиль <img onClick={handleClickClose} src="/img/cancel_active.svg" alt="button of cancel" className="btn_close_basket"/></h2>

            <ul className="user_data">
                <li>Имя:</li>
                <p>{userData.name}</p>
                <li>Фамилия:</li>
                <p>{userData.surname}</p>
                <li>Логин:</li>
                <p>{userData.login}</p>
            </ul>

            <img src="/gif_authorized_user.gif" alt="gif picture" className="gif"/>

            <button onClick={exitFromProfile} className="btn_exit">
                <img src="/img/arrow_left.svg" alt="arrow" />
                Выйти из аккаунта
            </button>

        </div>
    </div>
)

}

export default Authorized_user;