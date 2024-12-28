import '../styles_scss/userRegistr.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios from 'axios';


function User_registration({setIsAuthenticated, setUserData}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate()

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/
        if (!passwordRegex.test(password)) {
            setPasswordError('Пароль должен содержать не менее 7 символов, хотя бы одну большую букву и одну цифру')
            return false
        } else {
            setPasswordError('')
            return true
        }
    }

    //функция для сохранения данных юзера на сервере
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validatePassword(password)) {
            return;
        }

        try {
            //хеширование пароля перед отправкой на сервер
            const hashedPassword = await bcrypt.hash(password, 10)

            //данные для отправки на сервер
            const userData = {
                name,
                surname,
                login,
                password: hashedPassword,
                role: 'user'
            }

            //отправка данных на json server
            const response = await axios.post('http://localhost:3001/users', userData)
            alert('Пользователь успешно зарегистрирован')

            //сохранение данных в localStorage
            localStorage.setItem('userData', JSON.stringify(userData))
            localStorage.setItem('isAuthenticated', 'true')

            setUserData(userData)
            setIsAuthenticated(true)
            //перенаправление на домашнюю страницу
            navigate('/authorized_user')
        } catch (error) {
            alert('Ошибка при регистрации пользователя:')
        }
    }


    return(
        <div className='registr_full'>
            <img src="/img/login_form/strelochka.svg" alt="form" className="strelka"/>

            <div className='registration'>

                <div className='registr_text'>
                    <h1>Регистрация</h1>

                    <form onSubmit={handleSubmit}>
                        <input type='text' name='name' placeholder='Имя' required value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type='text' name='surname' placeholder='Фамилия' required value={surname} onChange={(e)=>setSurname(e.target.value)} />
                        <input type='text' name='login' placeholder='Логин' required value={login} onChange={(e)=>setLogin(e.target.value)} />
                        <input type='password' name='password' placeholder='Пароль' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    
                        {passwordError && <p className='error_message'>{passwordError}</p>}

                        <button type='submit' className='btn_registr' >Зарегистрироваться<img src='/img/login_form/arrow-right.png' alt='arrow' className='img_arrow_in_btn'/></button>
                    </form>

                </div>


                <div className='picture2'>
                    <img src='/img/login_form/picture_regist.png' />
                </div>

            </div>

            {/* маршрутизация до главной страницы */}
            <Link to='/user_enter'>
                <button className='btn_back'>Назад</button>            
            </Link>
        </div>
    )
}

export default User_registration;