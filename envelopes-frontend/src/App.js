import React, { useState, useEffect } from 'react';
import EnvelopeList from './components/EnvelopeList';
import AddEnvelope from './components/AddEnvelope';
import UpdateEnvelope from './components/UpdateEnvelope';
import FundsTransfer from './components/FundsTransfer';
import DeleteEnvelope from './components/DeleteEnvelope';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Envelopes</h1>
      <EnvelopeList/>
    </div>
  );
}

export default App;
