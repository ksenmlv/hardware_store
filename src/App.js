import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import RightBasket from './components/RighrBasket';
import Home from './pages/Home';
import User_enter from './pages/UserEnter';
import User_registration from './pages/UserRegistration';
import Authorized_user from './pages/AuthorizedUser';
import Successful_payment from './components/SuccessfulPayment';



function App() {
  const [items, setItems] = useState([])                                                 //карточки товаров на странице
  const [basketItems, setBasketItems] = useState([])                                     //товары в корзине
  const [orders, setOrders] = useState([])                                               //оформленные заказы
  const [cardOpened, setCardOpened] = useState(false)                                    //состояние открытия корзины
  const [isProfileOpened, setIsProfileOpened] = useState(false)                          //состояние открытия панели авторизированного пользователя
  const [isSuccessfulPaymentOpened, setIsSuccessfulPaymentOpened] = useState(false)      //состояник открытия панели успешного оформления заказа
  const [searchValue, setSearchValue] = useState('')                                     //значение в строке поиска товаров
  const [totalPrice, setTotalPrice] = useState(0)                                        //значение итоговой стоимости заказа
  const [isAuthenticated, setIsAuthenticated] = useState(false)                          //состояние авторизированного пользователя
  const [userData, setUserData] = useState([])                                           //данные авторизованного юзера
  const [isLoading, setIsLoading] = useState(true)                                       //состояние загрузки карточек товаров




  //добавление карточек товаров из бекенда на основную страницу 
  //и в корзину(если ранее туда было что-то добавлено)
  useEffect(() => {
    async function fetchData() {
      try {
        const [basketResponse, itemsResponse] = await Promise.all([
          axios.get('http://localhost:3001/basket'),
          axios.get('http://localhost:3001/all_items')
        ])

        setIsLoading(false)
        setBasketItems(basketResponse.data)
        setItems(itemsResponse.data)

        //загрузка оформленных заказов с сервера
        const storedOrders = axios.get('http://localhost:3001/orders')

      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }

    fetchData()

    //загрузка данных юзера из localStorage
    const storedUserData = localStorage.getItem('userData')
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
    if (storedUserData && storedIsAuthenticated === 'true') {
      setUserData(JSON.parse(storedUserData))
      setIsAuthenticated(true)
    }
  }, [])



  //добавление товара в корзину
  const onAddToBasket = async (obj) => {
    try {
        const existingItem = basketItems.find((item) => item.id === obj.id)    //проверка, есть ли уже товар в корзине

        if (existingItem) {
          //товар уже есть в корзине, значит его надо удалить после нажатия на кнопку
          await axios.delete(`http://localhost:3001/basket/${obj.id}`)
          setBasketItems((prev) => prev.filter((item) => item.id !== obj.id))
        }  else {
          const response = await axios.post('http://localhost:3001/basket', obj)
          setBasketItems((prev) => [...prev, response.data])
        }
    } 
    catch (error) {
      console.error('Ошибка при добавлении товара в корзину', error)
    }
  }


    
  //удаление товара из корзины (из бекенда в том числе)
  const onRemoveItemBasket = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/basket/${id}`);
        setBasketItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
    }
};


  //помещаем в переменную searchValue значение из инпута
  const onChangeSearchValue = (event) => (
    setSearchValue(event.target.value)
  )


  //обновление итоговой суммы при изменении корзины 
  useEffect(() => {
    const total = basketItems.reduce((sum, item) => sum + item.price, 0)
    const tax = total * 0.1
    const totalWithTax = total + tax
    setTotalPrice(totalWithTax)
  }, [basketItems])



  return (
    <div className="wrapper">
      {cardOpened && <RightBasket 
                        items={basketItems} 
                        onClose={() => setCardOpened(false)} 
                        onRemove={onRemoveItemBasket}
                        setTotalPrice={setTotalPrice} 
                        setBasketItems={setBasketItems} 
                        basketItems={basketItems}
                        orders={orders}
                        setOrders={setOrders}
                        isAuthenticated={isAuthenticated} 
                        setIsSuccessfulPaymentOpened={setIsSuccessfulPaymentOpened}
                        userData={userData}/>} 

      {/* клик по иконке пользователя */}
      {isProfileOpened && ( 
        <div className='overlay'>
          <div className='rightSide'>
            {isAuthenticated ? (
              <Authorized_user userData={userData} setIsAuthenticated={setIsAuthenticated} setIsProfileOpened={setIsProfileOpened}/>
            ) : (
              <User_enter setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} />
            )}
          </div>
        </div>
      )}

      {/* клик по иконке корзины */}
      <Header totalPrice={totalPrice} onClickCard={()=>setCardOpened(true)} onClickProfile={() => setIsProfileOpened(true)} isAuthenticated={isAuthenticated}/> 

      {isSuccessfulPaymentOpened && <Successful_payment setIsSuccessfulPaymentOpened={setIsSuccessfulPaymentOpened}/>}
      

      {/* маршрутизация по вкладкам */}
      <Routes>
          <Route path="/" element={<Home 
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchValue={onChangeSearchValue}
            onAddToBasket={onAddToBasket}
            basketItems={basketItems}
            isLoading={isLoading}
          /> }/>
        <Route path='/user_enter' element={<User_enter setIsAuthenticated={setIsAuthenticated} setUserData={setUserData}/>}/>
        <Route path='/user_registration' element={<User_registration setIsAuthenticated={setIsAuthenticated} setUserData={setUserData}/>} />
      </Routes>

    </div>
  );
}

export default App;   //возможность использовать эту функцию в других файлах
