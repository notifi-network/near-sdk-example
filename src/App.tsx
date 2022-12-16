import React from 'react';
import './App.css';
import { NotifiCard } from './Notifi/NotifiCard';
import { NearSignInButtons } from './components/NearSignInButtons';

function App() {
  return (
    <div className="App">
        <div
        >
          <NearSignInButtons />
          <NotifiCard />
        </div>
    </div>
  );
}

export default App;
