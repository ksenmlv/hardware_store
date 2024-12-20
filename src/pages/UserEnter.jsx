import { useEffect, useState } from 'react';
import './userEnter.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function User_enter( {setIsAuthenticated, setUserData} ) {
    const [users, setUsers] = useState([])
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    //хук на получение списка юзеров из бд
    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(res => {
                setUsers(res.data)
                console.log(res.data)
            })
            .catch(error => {
                console.error('Ошибка при получении данных о пользователе:', error);
            });
    }, [])

    //функция авторизации юзера
    const handleEnter = async (e) => {
        e.preventDefault()      //предотвращаем стандартное поведение отправки формы, чтобы сначала проверить корректность введенных данных
        
        try {
            const response = await axios.get('http://localhost:3001/users')
            const users = response.data
            const user = users.find(u => u.login === login && u.password === password)
            
            if (user) {
                //сохранение данных в localStorage
                localStorage.setItem('userData', JSON.stringify(user))
                localStorage.setItem('isAuthenticated', 'true')

                setIsAuthenticated(true)
                setUserData(user)              //сохранение данных авторизованного юзера
                alert('С возвращением!')
                navigate('/')
            } else {
                alert('Неверный логин или пароль!') 
            }
        } catch (error) {
            console.error('Ошибка при входе:', error)
        }
    }


    return(
        <div className="login_full">
            <img src="/img/login_form/strelochka.svg" alt="form" className="strelka"/>

            <div className="login">

                <div className="login_text">
                    <h1>Вход</h1>

                    {/* тег form - для ввода данных и отправки их на сервер для обработки */}
                    <form onSubmit={handleEnter}>
                        <input type="text" name="login" placeholder="Введите логин" required value={login} onChange={(e) => setLogin(e.target.value)}/>
                        <input type="password" name="password" placeholder="Введите пароль" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        
                        {/* {error && <p className='error_message'>{error}</p>} */}
                        
                        <button type='submit' className='btn_enter'>Войти<img src='/img/login_form/arrow-right.png' alt='arrow' className='img_arrow_in_btn'/></button>
                    </form>
                    
                    <div className='text_with_image'>
                        <img src='/img/login_form/Vector.png' alt="Background Image" class="pic_under_text" />
                        <p>Нет аккаунта? <Link to='/user_registration'>Зарегистрироваться</Link></p>
                    </div>
                    
                </div>

                <div className="picture">
                    <img src="/img/login_form/picture.png" alt="picture" className="pic"/>
                    <img src="/img/login_form/back_picture.png" alt="back of picture" className="back_pic"/>
                </div>               
                
            </div>

            {/* маршрутизация до главной страницы */}
            <Link to='/'>
                <button className='btn_back'>Назад</button>            
            </Link>

        </div>
    )
}

export default User_enter;