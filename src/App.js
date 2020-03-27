import React from 'react';
import './App.css';

import Pokemon from './page/pokemon/pokemon.component';

const App = () => {
  return (
    <div className="App">
    	<h1 className='title'>Pokemon Card Game</h1>
        <Pokemon />
    </div>
  );
}

export default App;
