/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'Cp9DgiaVrQUODIkMTY7mHrIJExGOpxxb&';
const defaultAvatar = 'https://i.pinimg.com/736x/1c/27/c6/1c27c6b4f4776e7ca9da75c5e93a5b4f.jpg';

function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('Trends ★');
  const [mod, setMod] = useState(true);

  useEffect(() => {
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=40`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(e => console.log(e))
  }, [])

  const search = () => {
    if (query !== '') {
      setLoading(true)
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`)
        .then((result) => {
          setData([...result.data.data])
          setTitle(query)
          setLoading(false)
        })
    } else {
      alert('Please, write something...')
    }
  }

  if (loading) {
    return (<div className='loading'>Loading...</div>)
  }

  return (
    <div className={mod ? 'appLight' : 'appDark'}>

      <button onClick={() => setMod(false)} className='button darkButton' style={mod ? { opacity: 0.5 } : { opacity: 1 }}>🌙</button>
      <button onClick={() => setMod(true)} className='button lightButton' style={mod ? { opacity: 1 } : { opacity: 0.3 }}>☀️</button>

      <div className='search-area'>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={'Write something'} />
        <button onClick={search}>Ara</button>
      </div>
      <div className='content'>
        <div className='container'>
          <h1 className={mod ? 'titleLight' : 'titleDark'}>{title}</h1>
          <div className='row'>
            {data?.map((item) => (
              <div className='col-md-3 gif-item'>
                <a href={item.images.original.url} target='_blank' rel="noreferrer">
                  <img src={item.images.original.url} />
                </a>
                <div className={mod ? 'userAreaLight' : 'userAreaDark'}>
                  <img src={item.user?.avatar_url || defaultAvatar} style={{ width: 40, height: 40, borderRadius: 100 }} />
                  <span>
                    <a href={item.user?.profile_url || ''} target='_blank' rel="noreferrer">{item.user?.display_name || 'Anonymous'}</a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
