import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => console.log(error))
  }, []);
  
  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

    const numAscending = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    console.log(numAscending);

    const volumeAscending = [...coins].sort((a, b) => b.total_volume - a.total_volume);
    console.log(volumeAscending);

    const coinAscending = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    console.log(coinAscending);



  return (
    <>
    <h1 className='container-header'>
    <img src={process.env.PUBLIC_URL + '/logo.png'} className='brand-logo' /> 
    </h1>
        <div className='card-rank-container'>
            <div className='gainer-div'>
            <p className='move'>Top Gainers <span role='img' aria-label='fire'> 🔥</span></p>
            {numAscending.slice(0,5).map(coin => {
              return (
                <div className='gainer-container' key={coin.id}>
                  <table className='card-rank'>
                    <tbody>
                    <td className='gainer-link name-link' ><img src={coin.image} alt='crypto' className='coin-image' /> <span className='coin-name'>{coin.name}</span> <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span></td>
                      <td className='gainer-link change-link'>
                      <div>
                                    {coin.price_change_percentage_24h < 0 ? (
                                    <span className='coin-percent red'>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                    ) : 
                                    (<span className='coin-percent green'>{coin.price_change_percentage_24h.toFixed(2)}%</span>)}
                                </div>
                      </td>
                    </tbody>
                </table>
                </div>
              );
            })}
            </div>
            <div className='gainer-div volume-gainer'>
            <p className='move'>Highest 24h Volume <span role='img' aria-label='fire'> 📈</span></p>
        {volumeAscending.slice(0,5).map(coin => {
          return (
            <div className='gainer-container' key={coin.id}>
              <table className='card-rank'>
                <tbody>
                  <td className='gainer-link name-link' ><img src={coin.image} alt='crypto' className='coin-image' /> <span className='coin-name'>{coin.name}</span> <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span></td>
                  <td className='gainer-link change-link'>${coin.total_volume.toLocaleString()}</td>
                </tbody>
            </table>
            </div>
          );
        })}
        </div>
        <div className='gainer-div'>
        <p className='move'>Top Losers<span role='img' aria-label='fire'> 📉</span></p>
        {coinAscending.slice(0,5).map(coin => {
          return (
            <div className='gainer-container' key={coin.id}>
              <table className='card-rank'>
                <tbody>
                <td className='gainer-link name-link' ><img src={coin.image} alt='crypto' className='coin-image' /> <span className='coin-name'>{coin.name}</span> <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span></td>
                  <td className='gainer-link change-link'>
                  <div>
                                    {coin.price_change_percentage_24h < 0 ? (
                                    <span className='coin-percent red'>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                    ) : 
                                    (<span className='coin-percent green'>{coin.price_change_percentage_24h.toFixed(2)}%</span>)}
                                </div>
                  </td>
                </tbody>
            </table>
            </div>
          );
        })}
        </div>
        </div>


    <div className='coin-search'>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange}/>
        </form>
      </div>
     

<div className='coin-table-div'>
      <table className='coin-table'>
        <thead className='header-container'>
          <tr className='header-row'>
              <th className='header header-1'>#</th>
              <th className='header header-2'>Name</th>
              <th className='header header-3'>Price</th>
              <th className='header header-4'>24hr%</th>
              <th className='header header-5'>Market Cap</th>
              <th className='header header-6'>Circulating Supply</th>
              <th className='header header-7'>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
              {filteredCoins.map(coin => {
                      return (
                        <>
                          <tr className='coin-row'>
                              <td className='table-data coin-rank'>{coin.market_cap_rank}</td>
                              <td className='table-data coin-name'><img src={coin.image} alt='crypto' className='coin-image' /> {coin.name} <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span></td>
                                <td className='table-data coin-price'>${coin.current_price.toLocaleString()}</td>
                                <td className='table-data coin-change'>
                                <div>
                                    {coin.price_change_percentage_24h < 0 ? (
                                    <span className='coin-percent red'>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                    ) : 
                                    (<span className='coin-percent green'>{coin.price_change_percentage_24h.toFixed(2)}%</span>)}
                                </div>
                                </td>
                                <td className='table-data coin-marketcap'>${coin.market_cap.toLocaleString()}</td>
                                <td className='table-data coin-supply'>{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                                  {/*<div>
                                  {coin.max_supply !== 'null' && coin.max_supply > coin.circulating_supply ? (
                                    <p className='display'>{coin.max_supply}</p> ) 
                                    :
                                    ( <p className='display-none'>{coin.max_supply}</p>)
                                  }
                                </div>*/}
                                </td>
                                <td className='table-data coin-last'><img className='graph-image' src={process.env.PUBLIC_URL + '/graph.png'} /></td>
                            </tr>
                          </>
                      )
                    })}
          </tbody>
        </table>
        </div>
    </>
  );
}

export default App;
