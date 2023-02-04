import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './main/Calculator';
import registerServiceWorker from './registerServiceWorker';

//Define o componente que será renderizado na tela.
ReactDOM.render(
    <div>
        <h1>Calculadora</h1>
        <Calculator />
    </div>
    //Seleciona o elemento com o id definido.
, document.getElementById('root'));
registerServiceWorker();
