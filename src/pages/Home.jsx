import Card from '../components/Card';

function Home({items, searchValue, setSearchValue, onChangeSearchValue, onAddToBasket, basketItems, isLoading}) {
  
  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (isLoading ? [...Array(16)].map((_, index) => (
      <Card key={index} loading={true} />
    )) : filteredItems.map(item => (
        <Card
          key={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          onClickPlus={() => onAddToBasket(item)}
          basketItems={basketItems}
          loading={isLoading}
        />
      )))
  }

    return (
        <div className="content">
          <div className="header2">
            <h1>{searchValue ? `Поиск: "${searchValue}"` : `Все товары:`}</h1>
            <div className="searchBlock">
              <img src="/img/searchLupa.svg" alt="Search" />
              <input
                onChange={onChangeSearchValue}
                value={searchValue}
                placeholder="Поиск..."
              />
              {searchValue && (
                <img
                  onClick={() => setSearchValue('')}
                  className='clearSearch'
                  src="/img/cancel_passive.svg"
                  alt='clear'
                />
              )}
            </div>
          </div>
    
          <div className="toys">
            {renderItems()}         
          </div>
        </div>
    );
}

export default Home;