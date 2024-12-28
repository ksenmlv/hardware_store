import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({totalPrice, onClickCard, onClickProfile, isAuthenticated}) {
    const location = useLocation()
    const navigate = useNavigate()
    const isHomePage = location.pathname === '/' 

    const handleClickProfile = () => {
        if (isAuthenticated) {
            onClickProfile()
        } else {
            navigate('user_enter')
        }
    }


    return(
        <header>
            {/*левая часть заголовка*/}  
            <div className='headerLeft'>
                <Link to="/">
                    <img width={60} height={60} src="/img/logo.jpg" />
                </Link>
                <div>
                    <h3>Дроны</h3>
                    <p>Ассортимент технического оборудования</p>
                </div>
            </div>

            {/* правая часть заголовка */}
            {/* показываем иконнки корзины и юзера только на домашней странице */}
            {isHomePage && (
                <ul className="headerRight">
                <li onClick={onClickCard}>
                    <img width={18} height={18} src="/img/basket.svg" />
                    <span>{totalPrice}₽</span>
                </li>
                <li onClick={handleClickProfile}>
                    <img width={18} height={18} src="/img/user.svg" />

                    {/* <Link to={isAuthenticated ? {onClickProfile} : '/user_enter'}>
                        <img width={18} height={18} src="/img/user.svg" />
                    </Link> */}
                </li>
                </ul>
            )}
        
      </header>
    )
}


export default Header;