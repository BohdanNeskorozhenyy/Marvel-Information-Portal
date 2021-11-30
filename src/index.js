import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelServices from './services/MarvelService';


import './style/style.scss';

const marvelService = new MarvelServices();

marvelService.getAllCharacters().then(response => response.data.results.forEach(item => console.log(item.name)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

